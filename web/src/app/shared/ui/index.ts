/**
 * Shared UI Component Library (`@ui`) barrel module.
 *
 * @remarks
 * Encapsulates generic `mes-*` Angular Material M3 primitives implementing
 * {@link MesSharedComponent} so feature and page components never import `@angular/material/*` directly.
 */
export { trimmed, type MesSharedComponent } from './contracts/shared_component';
export { MesAvatarComponent } from './mes-avatar.component';
export {
  MesButtonToggleComponent,
  type MesButtonToggleOption,
} from './mes-button-toggle.component';
export {
  MesButtonComponent,
  type MesButtonSize,
  type MesButtonVariant,
} from './mes-button.component';
export { MesCardComponent, type MesCardRadius, type MesCardVariant } from './mes-card.component';
export { MesChipComponent, type MesChipSize, type MesChipVariant } from './mes-chip.component';
export { MesDividerComponent } from './mes-divider.component';
export { MesDrawerComponent, type MesDrawerNavLink } from './mes-drawer.component';
export { MesHeadingComponent, type MesHeadingSize } from './mes-heading.component';
export { MesIconButtonComponent } from './mes-icon-button.component';
export { MesIconComponent } from './mes-icon.component';
export { MesIframeComponent } from './mes-iframe.component';
export { MesSpinnerComponent } from './mes-spinner.component';
export { MesTimelineComponent, MesTimelineItemComponent } from './mes-timeline.component';
export { MesToolbarComponent } from './mes-toolbar.component';
export { MesVideoPreviewComponent } from './mes-video-preview.component';
