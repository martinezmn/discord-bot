import { TimeMeasure } from '../entities/time.measure';
import { Repository } from './_repository';

export interface TimeMeasureUpsert extends Partial<TimeMeasure> {
  userId: string;
  guildId: string;
}

export class TimeMeasureRepository extends Repository {
  async upsert(timeMeasure: TimeMeasureUpsert): Promise<TimeMeasure> {
    return new TimeMeasure(
      await this.prismaClient.timeMeasure.upsert({
        where: {
          guildId_userId: {
            guildId: timeMeasure.guildId,
            userId: timeMeasure.userId,
          },
        },
        update: { ...timeMeasure, createdAt: null, updatedAt: null },
        create: { ...timeMeasure, createdAt: null, updatedAt: null },
      })
    );
  }

  async findAllOnline(): Promise<TimeMeasure[]> {
    const timeMeasures = await this.prismaClient.timeMeasure.findMany({
      where: {
        loggedAt: {
          not: null,
        },
      },
    });

    return timeMeasures.map((timeMeasure) => {
      return new TimeMeasure(timeMeasure);
    });
  }

  async findOneByGuildIdAndUserId(
    guildId: string,
    userId: string
  ): Promise<TimeMeasure | null> {
    const timeMeasure = await this.prismaClient.timeMeasure.findFirst({
      where: { guildId, userId },
    });

    if (!timeMeasure) return null;

    return new TimeMeasure(timeMeasure);
  }
}
