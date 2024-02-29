import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UploadDownload';
  inputData :string ="";
  FileUrl = 'https://api.escuelajs.co/api/v1/files/';
  uploadFileNames : string[] = [];
  constructor(private http : HttpClient)
  {

  }
  uploadImage(event:any)
  {
    const file = event.currentTarget.files[0];
    console.log(file);
    if(file.type === 'image/png' && file.size < 2000000)
    {
      const formObj = new FormData();
      formObj.append('file', file);
      debugger;
      this.http.post('https://api.escuelajs.co/api/v1/files/upload', formObj).subscribe((res : any)=>{
        debugger;
        console.log(res);

        this.uploadFileNames.push(res.filename);
        console.log(this.FileUrl + res.filename);

      });
      this.inputData = "";
    }
    else
    {
      if(file.size > 2000000)
      {
        alert("file size must be less than 2 MB");
      }
      else
      {
        alert("only files with png extension");
      }
    }

  }
  downloadFile(fileName:string)
  {
    const downloadUrl = this.FileUrl + fileName;
    this.http.get(downloadUrl, {responseType: 'blob'}).subscribe((response:Blob)=>{
      const blob = new Blob([response], {type : response.type});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
