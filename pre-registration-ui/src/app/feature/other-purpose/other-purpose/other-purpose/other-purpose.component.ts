import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/core/services/config.service";
import * as appConstants from "../../../../app.constants";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { DataStorageService } from "src/app/core/services/data-storage.service";
import Utils from "src/app/app.util";
import { Subscription } from "rxjs";
import { DialougComponent } from "src/app/shared/dialoug/dialoug.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-other-purpose",
  templateUrl: "./other-purpose.component.html",
  styleUrls: ["./other-purpose.component.css"],
})
export class OtherPurposeComponent implements OnInit {
  userPrefLanguage = localStorage.getItem("userPrefLanguage");
  userPrefLanguageDir = "";
  ltrLangs = this.config
    .getConfigByKey(appConstants.CONFIG_KEYS.mosip_left_to_right_orientation)
    .split(",");
  canDeactivateFlag = true;
  userForm = new FormGroup({});
  errorlabels: any;
  otherPurposeLabels: any;
  apiErrorCodes: any;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private config: ConfigService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {
    this.translate.use(this.userPrefLanguage);
  }

  ngOnInit() {
    if (this.ltrLangs.includes(this.userPrefLanguage)) {
      this.userPrefLanguageDir = "ltr";
    } else {
      this.userPrefLanguageDir = "rtl";
    }
    this.getLabels(this.userPrefLanguage);
    this.userForm.addControl("purpose", new FormControl(""));
    this.userForm.controls["purpose"].setValidators(Validators.required);
  }

  private getLabels(lang) {
    this.dataStorageService.getI18NLanguageFiles(lang).subscribe((response) => {
      if (response["message"]) {
        this.errorlabels = response["error"];
        this.otherPurposeLabels = response["otherPurpose"];
        this.apiErrorCodes = response[appConstants.API_ERROR_CODES];
      }
    });
  }

  onBack() {
    this.canDeactivateFlag = false;
    this.router.navigate([`${this.userPrefLanguage}/dashboard`]);
  }

  onSubmit() {
    this.userForm.controls["purpose"].markAsTouched();
    if (this.userForm.valid) {
      const purposeVal = this.userForm.controls["purpose"].value;
      const validRegex = new RegExp("^[a-zA-Z0-9_.-\\s]*$");
      const validRegex1 = new RegExp("^(?=.{0,50}$).*");
      if (validRegex.test(purposeVal) == false) {
        this.showErrorMessage(null, this.otherPurposeLabels.errmsg1);
      } else if (validRegex1.test(purposeVal) == false) {
        this.showErrorMessage(null, this.otherPurposeLabels.errmsg2);
      } else {
        const request = {
          langCode: this.userPrefLanguage,
          purpose: purposeVal
        };
        this.subscriptions.push(
          this.dataStorageService.addMiscPurpose(request).subscribe(
            (response) => {
              let newApplicationId =
                response[appConstants.RESPONSE].applicationId;
              this.router.navigateByUrl(
                `${this.userPrefLanguage}/pre-registration/booking/${newApplicationId}/pick-center`
              );
            },
            (error) => {
              this.showErrorMessage(error);
            }
          )
        );
      }
    }
  }

  /**
   * @description This is a dialoug box whenever an error comes from the server, it will appear.
   *
   * @private
   * @memberof FileUploadComponent
   */
  private showErrorMessage(error: any, customMsg?: string) {
    const titleOnError = this.errorlabels.errorLabel;
    let message = "";
    if (customMsg) {
      message = customMsg;
    } else {
      message = Utils.createErrorMessage(
        error,
        this.errorlabels,
        this.apiErrorCodes,
        this.config
      );
    }
    const body = {
      case: "ERROR",
      title: titleOnError,
      message: message,
      yesButtonText: this.errorlabels.button_ok,
    };
    this.dialog.open(DialougComponent, {
      width: "400px",
      data: body,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
