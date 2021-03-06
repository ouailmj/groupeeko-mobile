import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ApiProvider} from "../api/api";
import {HttpHeaders} from "@angular/common/http";
import {  LoadingController, ToastController } from 'ionic-angular';
import {ChooseTopicData, commentData} from "../types/eventData";
import { TopicRoutes } from './../mytopic/mytopic.routes';
/*
  Generated class for the TopicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TopicProvider {

  constructor(public http: HttpClient,
    public apiProvider: ApiProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello TopicProvider Provider');
  }

  getConversations():Promise<any>{


    return new Promise((resolve, reject) => {


        this.storage.get('token').then(tok=>{

            let headers = new HttpHeaders();

            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
            headers = headers.set('Authorization', 'Bearer ' + tok);
            //get conversations
            this.apiProvider.get(TopicRoutes.apiConversations,{headers: headers}).then(rep=>{

                resolve(rep["hydra:member"]);

            }).catch(error=>{

                reject(error);

            })
        }).catch(error=>{

            reject('erro');
        })


    })

    }

    addChooseTopic(chooseTopicData: ChooseTopicData): Promise<any>{

        return new Promise((resolve, reject) => {


            this.storage.get('token').then(tok=>{

                let headers = new HttpHeaders();
                headers = headers.set('Content-Type', 'application/json');
                this.apiProvider.post(TopicRoutes.apiConversations, chooseTopicData,{headers: headers}).then(rep=>{
                    console.log(rep)
                    resolve("ok");

                }).catch(error=>{


                    reject(error);

                })
            }).catch(error => {
                console.log(error.status);
            });

        })

    }

        addComment(comData:commentData): Promise<any>{
        return new Promise((resolve, reject) => {

            this.storage.get('token').then(tok=>{

                let headers = new HttpHeaders();
                headers = headers.set('Content-Type', 'application/json');
                this.apiProvider.post(TopicRoutes.apiCommentData, comData,{headers: headers}).then(rep=>{
                    resolve("ok");
                }).catch(error=>{
                    reject(error);
                })
            }).catch(error => {
                console.log(error.status);
            });

        })
    }

    DeleteConversation(id:string , path:string) {
        this.storage.get('token').then(tok=>{
                let headers = new HttpHeaders();
                headers = headers.set('Content-Type', 'application/json');
                this.apiProvider.delete(path + id).subscribe(
                    rep => console.log("deleted"),
                    error => console.log("error")                
                );
            }).catch(error => {
                console.log(error.status);
            });
    }

}
