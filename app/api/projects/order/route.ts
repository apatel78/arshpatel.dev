import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { z } from 'zod';

export async function GET() {
  try {
    const projectsWithRankings = await prisma.project.findMany({
      include: {
        rankingData: true,
      },
    });

    const calculatedRankings = projectsWithRankings.map(p => {
      const rankData = p.rankingData;
      const totalVotes = rankData?.totalVotes ?? 0;
      const totalRankSum = rankData?.totalRankSum ?? 0;

      const averageRank = totalVotes > 0 ? totalRankSum / totalVotes : Infinity;
      return {
        projectId: p.id,
        averageRank: averageRank,
      };
    });

    calculatedRankings.sort((a, b) => {
      const rankDiff = a.averageRank - b.averageRank;
      if (Math.abs(rankDiff) < 0.0001) {
        return b.projectId - a.projectId;
      }
      return rankDiff;
    });

    const orderedIds = calculatedRankings.map(r => r.projectId);
    return NextResponse.json(orderedIds);

  } catch (error) {
    console.error('[API GET /projects/order] Error:', error);
    return NextResponse.json({ message: 'Failed to fetch project order' }, { status: 500 });
  }
}

const SaveOrderSchema = z.object({
  order: z.array(z.number()).min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = SaveOrderSchema.safeParse(body);

    if (!validation.success) {
      console.error('[API POST /projects/order] Invalid body:', validation.error.errors);
      return NextResponse.json({ message: 'Invalid request body', errors: validation.error.errors }, { status: 400 });
    }

    const { order: submittedProjectIds } = validation.data;

    const projectsInDb = await prisma.project.findMany({
        where: { id: { in: submittedProjectIds } }
    });
    if(projectsInDb.length !== submittedProjectIds.length) {
        console.error('[API POST /projects/order] Mismatch! Some submitted project IDs not found in Project table.');
    }

    const transactionResult = await prisma.$transaction(async (tx) => {
      const updates = submittedProjectIds.map(async (projectId, index) => {
        const rank = index + 1;

        const currentRanking = await tx.projectRanking.findUnique({
            where: { projectId: projectId },
        });

        const currentVotes = currentRanking?.totalVotes ?? 0;
        const currentRankSum = currentRanking?.totalRankSum ?? 0;

        return tx.projectRanking.upsert({
          where: { projectId: projectId },
          update: {
            totalVotes: currentVotes + 1,
            totalRankSum: currentRankSum + rank,
          },
          create: {
            projectId: projectId,
            totalVotes: 1,
            totalRankSum: rank,
          },
        });
      });
      return Promise.all(updates);
    });

    console.log(`[API POST /projects/order] Vote recorded successfully. ${transactionResult.length} rankings updated.`);
    return NextResponse.json({ message: 'Ranking vote recorded successfully' });

  } catch (error) {
    console.error('[API POST /projects/order] Error processing vote:', error);
    return NextResponse.json({ message: 'Failed to record ranking vote' }, { status: 500 });
  }
} 