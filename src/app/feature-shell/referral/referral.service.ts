import { Injectable } from "@angular/core";
import { ApiGateway } from "../../shared/services/api-gateway";
import { StorageService } from "../../shared/services/storage.service";
import { Observable } from "rxjs/Observable";
import { referFriendUrl, refersUrl } from '../featureshell.config'
@Injectable()
export class ReferralService {

    constructor(private apiGateWay: ApiGateway, private _storageService: StorageService) {

    }

    getReferrals(): Observable<any> {
        return this.apiGateWay.get<any>(
            refersUrl + "?referrerId=" + this._storageService.getUserId()
        );
    }

    referFriend(reqData: any): Observable<any> {

        return this.apiGateWay.post<any>(
            referFriendUrl,
            JSON.stringify(reqData)
        );
    }

}