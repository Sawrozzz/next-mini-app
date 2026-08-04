export type Feature = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

export type FeaturePageProps = {
  feature: Feature;
  isDark: boolean;
};