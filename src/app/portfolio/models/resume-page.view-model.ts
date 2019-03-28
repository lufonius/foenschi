import { ResumePersonalInfo } from './resume-personal-info.view-model';
import { ResumeHistoryStep } from './resume-history-step.view-model';

export class ResumePage {
  personalInfo: ResumePersonalInfo;
  history: ResumeHistoryStep[];
  heading: {
    title: string;
    subtitle: string;
  };
}
