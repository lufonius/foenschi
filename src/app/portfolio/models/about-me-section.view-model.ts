import { AboutMeSubsection } from "./about-me-subsection.view-model";

export interface AboutMeSection {
  title: string;
  subtitle: string;
  background: string;
  subsections: AboutMeSubsection[];
}
