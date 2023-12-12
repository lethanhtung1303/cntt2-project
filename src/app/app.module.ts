import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Import PrimeNG modules
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DockModule} from 'primeng/dock';
import {DragDropModule} from 'primeng/dragdrop';
import {DropdownModule} from 'primeng/dropdown';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ImageModule} from 'primeng/image';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {ScrollerModule} from 'primeng/scroller';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SpeedDialModule} from 'primeng/speeddial';
import {SpinnerModule} from 'primeng/spinner';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {RippleModule} from 'primeng/ripple';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {TreeModule} from 'primeng/tree';
import {TreeSelectModule} from 'primeng/treeselect';
import {TreeTableModule} from 'primeng/treetable';
import {AnimateModule} from 'primeng/animate';
import {CardModule} from 'primeng/card';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {HomeComponent} from './view/home/home.component';
import {LoginComponent} from './view/login/login.component';
import {SiteHeaderComponent} from './_layout/site-header/site-header.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SiteNavComponent} from './_layout/site-nav/site-nav.component';
import {PageNotFoundComponent} from './view/page-not-found/page-not-found.component';
import {LecturersListComponent} from './view/Lecturers/lecturers-list/lecturers-list.component';
import {
  UniversityLecturerListComponent
} from './view/LecturerStandards/University/university-lecturer-list/university-lecturer-list.component';
import {
  MasterLecturerListComponent
} from './view/LecturerStandards/MasterDegree/master-lecturer-list/master-lecturer-list.component';
import {LecturersDetailComponent} from './view/Lecturers/lecturers-detail/lecturers-detail.component';
import {LecturerInfoComponent} from './view/Lecturers/lecturers-detail/tab/lecturer-info/lecturer-info.component';
import {
  LecturerTrainingProcessComponent
} from './view/Lecturers/lecturers-detail/tab/lecturer-training-process/lecturer-training-process.component';
import {
  LecturerSatisfactionScoreComponent
} from './view/Lecturers/lecturers-detail/tab/lecturer-satisfaction-score/lecturer-satisfaction-score.component';
import {NgOptimizedImage} from "@angular/common";
import {
  EditTrainingProcessComponent
} from './view/Lecturers/lecturers-detail/tab/lecturer-training-process/edit-training-process/edit-training-process.component';
import {
  LecturerCertificateComponent
} from './view/Lecturers/lecturers-detail/tab/lecturer-certificate/lecturer-certificate.component';
import { SubjectsListComponent } from './view/Subjects/subjects-list/subjects-list.component';
import { SubjectDetailComponent } from './view/Subjects/subject-detail/subject-detail.component';
import { NormsLectureHoursComponent } from './view/norms-lecture-hours/norms-lecture-hours.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    SiteNavComponent,
    PageNotFoundComponent,
    LecturersListComponent,
    UniversityLecturerListComponent,
    MasterLecturerListComponent,
    LecturersDetailComponent,
    LecturerInfoComponent,
    LecturerTrainingProcessComponent,
    LecturerSatisfactionScoreComponent,
    EditTrainingProcessComponent,
    LecturerCertificateComponent,
    SubjectsListComponent,
    SubjectDetailComponent,
    NormsLectureHoursComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrganizationChartModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    RippleModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    CardModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
