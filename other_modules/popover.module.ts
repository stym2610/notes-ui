import {merge, Observable, of} from 'rxjs';

import {catchError, debounceTime, filter, takeUntil, tap} from 'rxjs/operators';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {ConnectedPosition, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Component({
  selector: "gs-popover",
  template: `
    <ng-template #tmpl>
      <div class="pop-container" (click)="contentClicked($event)" style="flex:  1 0 auto;">
        <ng-content>
        </ng-content>
      </div>
    </ng-template>
  `,
  styles: []
})
export class PopoverComponent implements OnInit, OnDestroy {

  @ViewChild("tmpl", {static: false})
  private _tmpl: TemplateRef<any>;

  @Input("closeOnClick")
  private _closeOnClick = true;

  @Input("fixedWidth")
  private _fixedWidth = false;

  @Output()
  public changes: EventEmitter<any> = new EventEmitter();

  private _opened = false;

  private _overlayRef: OverlayRef;

  // Todo: Need more robust solution for this
  private defaultPositions: ConnectedPosition[] = [
    {originX: "start", originY: "bottom", overlayX: "start", overlayY: "top"},
    {originX: "start", originY: "top", overlayX: "start", overlayY: "bottom"},
    {originX: "end", originY: "top", overlayX: "start", overlayY: "bottom"},
    {originX: "end", originY: "bottom", overlayX: "start", overlayY: "top"},
    {originX: "end", originY: "top", overlayX: "end", overlayY: "bottom"},
    {originX: "end", originY: "bottom", overlayX: "end", overlayY: "top"}
  ];

  constructor(private _ol: Overlay, private _vcr: ViewContainerRef, private _elRef: ElementRef) { }

  ngOnInit() {}


  public get opened() {
    return this._opened;
  }

  open(eleRef?: ElementRef, connectedPositions?: ConnectedPosition[]): Observable<any> {
    eleRef = eleRef || this._elRef;
    const width = (eleRef.nativeElement as HTMLElement).getBoundingClientRect().width;
    const positions = connectedPositions && connectedPositions.length > 0 ? connectedPositions : this.defaultPositions;
    const positionStrategy = this._ol
      .position()
      .flexibleConnectedTo(eleRef)
      .withPositions(positions);

    const scrollStrategy = this._ol.scrollStrategies.block();

    this._overlayRef = this._ol.create({
      panelClass: "gs-popover-panel",
      backdropClass: "gs-popover-backdrop",
      hasBackdrop: true,
      positionStrategy,
      scrollStrategy,
      minWidth: this._fixedWidth ? null : width,
      width: this._fixedWidth ? width : null
    });

    const portal = new TemplatePortal(this._tmpl, this._vcr);
    this._overlayRef.attach(portal);

    this._overlayRef
      .backdropClick()
      .subscribe(() => {
        this.close();
      }, console.error, () => console.warn("CLOSED on backdropClick"));

    positionStrategy
      .positionChanges.pipe(
      debounceTime(50),
      takeUntil(this._overlayRef.detachments()))
      .subscribe((change) => {
        const container = this._overlayRef.overlayElement.querySelector(".pop-container");
        if (container) {
          container.className = "pop-container " + change.connectionPair.overlayY + " " + change.connectionPair.overlayX;
        }
      }, console.error, () => console.warn("CLOSED with positionStrategy"));

    this._overlayRef
      .keydownEvents().pipe(
      filter(e => e.key === "Escape"))
      .subscribe(() => this.close());

    this._opened = true;
    return merge(this.changes).pipe(
            takeUntil(this.changes.pipe(filter(v => v === "DISPOSED"))),
            filter(v => v !== "DISPOSED"),
            tap(console.info),
            catchError(err => {
              this._opened = false;
              this.close();
              return of(err);
            }));
  }

  close(type = "CLOSE") {
    if (this._overlayRef) {
      this.changes.emit(type);
      this._overlayRef.detach();
      this._overlayRef.dispose();
      this._overlayRef = null;
      this.changes.emit("DISPOSED");
    }
    this._opened = false;
  }

  contentClicked(evt) {
    if (this._closeOnClick) {
      this.close();
    }
  }

  ngOnDestroy() {
    this.close();
  }

}


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
//import {PopoverComponent} from "./popover.component";
import {OverlayModule} from "@angular/cdk/overlay";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [PopoverComponent],
  declarations: [PopoverComponent]
})
export class PopoverModule { }