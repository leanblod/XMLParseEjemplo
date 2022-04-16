import { Component } from '@angular/core';  
import * as xml2js from 'xml2js';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title = 'read-xml-angular8';  
  public xmlItems: any;  
  constructor(private _http: HttpClient) { this.loadXML(); }
  loadXML() {
    this._http.get('http://restapi.adequateshop.com/api/Traveler',  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
          .append('Accept','application/xml'),  
        responseType: 'text',
      }
      ).subscribe((data) => {  
        this.xmlItems = this.parseXML(data);
      });  
  }  
  parseXML(data: any) {
    const arr: any = []; 
      // parser = new xml2js.Parser(  
      //   {  
      //     trim: true,  
      //     explicitArray: true  
      //   });
    xml2js.parseString(data, {  
      trim: true,  
      explicitArray: true  
    }, function (err: any, result: any) {
      var lista = result.TravelerinformationResponse.travelers[0].Travelerinformation;
      console.log(result);
      for (let item of lista) {
        arr.push({  
          id: item.id[0],
          name: item.name[0],
          email: item.email[0],
          adderes: item.adderes[0],
          createdat: item.createdat[0],
        });
      }
    });

    return arr;
  }
} 