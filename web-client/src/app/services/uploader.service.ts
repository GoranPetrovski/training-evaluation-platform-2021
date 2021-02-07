import { Injectable } from "@angular/core";
import { ToastNotificationService } from "./toast-notification.service";
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Injectable()
export class UploaderService {
    private uploadUrl: string = 'http://localhost:8080/users/uploadPicture';
    public uploader: FileUploader;

    constructor(private toastNotificationService: ToastNotificationService) { };

    uploadImage(username: string, token: string) {
        const URL = `${this.uploadUrl}/${username}`;
        this.uploader = new FileUploader({ url: URL, headers: [{ name: "Authorization", value: token }], itemAlias: 'file' });
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.toastNotificationService.showNotification(`File ${item.file.name} is successfuly upload!`);
        };
    }
}