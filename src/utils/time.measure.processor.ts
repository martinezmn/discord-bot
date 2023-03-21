import { TimeMeasureRepository } from '../repositories/time.measure.repository';
import { MeasuresCalculator } from './measures.calculator';
import { OnlineUser } from './online.users.getter';

export class TimeMeasureProcessor {
  constructor(private measuresCalculator = new MeasuresCalculator()) {}

  async process(onlineUsers: OnlineUser[]): Promise<void> {
    const timeMeasureRepository = new TimeMeasureRepository();
    const onlineTimeMeasures = await timeMeasureRepository.findAllOnline();

    for (const online of onlineUsers) {
      const timeMeasure = onlineTimeMeasures.find((onlineTimeMeasure, idx) => {
        if (
          online.guildId !== onlineTimeMeasure.guildId ||
          online.userId !== onlineTimeMeasure.userId
        ) {
          return false;
        }
        /* Remove online timeMeasures from array because
          will be used to remove offlines later */
        onlineTimeMeasures.splice(idx, 1);
        return true;
      });

      if (timeMeasure) {
        /* This timeMeasure is already online so just ignore */
        continue;
      }

      console.log(`User ${online.userId} logged in on Guild ${online.guildId}`);
      await timeMeasureRepository.upsert({
        ...online,
        loggedAt: new Date(),
      });
    }

    for (const offline of onlineTimeMeasures) {
      /* Calculate online time and store on database */
      const calculated = await this.measuresCalculator.calculate(offline);
      console.log(
        `User ${calculated.userId} logged off on Guild ${calculated.guildId}`
      );
      await timeMeasureRepository.upsert({ ...calculated, loggedAt: null });
    }
  }
}
