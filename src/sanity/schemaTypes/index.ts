import project from "./documents/project";
import client from "./documents/client";
import service from "./documents/service";
import technology from "./documents/technology";
import testimonial from "./documents/testimonial";
import siteSettings from "./documents/siteSettings";
import menu from "./documents/menu";
import page from "./documents/page";
import playground from "./documents/playground";

import seo from "./objects/seo";
import creditItem from "./objects/credit";

import heroBlock from "./blocks/hero";
import textBlock from "./blocks/text";
import imageBlock from "./blocks/image";
import videoBlock from "./blocks/video";
import galleryBlock from "./blocks/gallery";
import gridBlock from "./blocks/grid";
import carouselBlock from "./blocks/carousel";
import textImageBlock from "./blocks/text-image";
import metricsBlock from "./blocks/metrics";
import creditsBlock from "./blocks/credits";
import ctaBlock from "./blocks/cta";
import techListBlock from "./blocks/tech-list";
import serviceListBlock from "./blocks/service-list";
import testimonialsBlock from "./blocks/testimonials";
import mockupsBlock from "./blocks/mockups";
import spacerBlock from "./blocks/spacer";
import dividerBlock from "./blocks/divider";

export const schemaTypes = [
  // documents
  project, client, service, technology, testimonial, siteSettings, menu, page, playground,
  // objects
  seo, creditItem,
  // blocks
  heroBlock, textBlock, imageBlock, videoBlock, galleryBlock, gridBlock, carouselBlock,
  textImageBlock, metricsBlock, creditsBlock, ctaBlock, techListBlock, serviceListBlock,
  testimonialsBlock, mockupsBlock, spacerBlock, dividerBlock,
];
