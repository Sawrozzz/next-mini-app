import type { ComponentType } from "react";
import { BiometricPage } from "./BiometricPage";
import { CameraPage } from "./CameraPage";
import { ContactPage } from "./ContactPage";
import { DownloadPage } from "./DownloadPage";
import { FilePage } from "./FilePage";
import { GalleryPage } from "./GalleryPage";
import { LocationPage } from "./LocationPage";
import type { Feature } from "./feature";

export const featurePages: Record<string, ComponentType<{ feature: Feature }>> =
  {
    location: LocationPage,
    camera: CameraPage,
    gallery: GalleryPage,
    file: FilePage,
    download: DownloadPage,
    contact: ContactPage,
    biometric: BiometricPage,
  };
