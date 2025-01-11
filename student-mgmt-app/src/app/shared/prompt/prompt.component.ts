import { Component, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-prompt',
  imports: [ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss'
})
export class PromptComponent {
  @Output() fnEmitter = new EventEmitter()
  constructor(private confirmationService: ConfirmationService) { }

  showPrompt(msg: string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.fnEmitter.emit();
      }
    });
  }
}
