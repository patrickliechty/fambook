fambookApp.factory('watchNotifyService', function($http, $q) {
  var watchAtomURL = "https://familysearch.org/watch/atom/resource/";
  var treeDataURL = "/tree-data/changes/person/";
  var treePersonURL = "https://familysearch.org/tree/#view=ancestor&person=";

  function processWatchNotifications(watchers) {
    var notifications = watchers;
    for(var i=0; i<notifications.length; i++) {
      if(notifications[i]) {
        var notification = notifications[i];
        console.log("notification: ", notification)
        for(var j=0; j<notification.links.length; j++) {
          if(notification.links[j].rel === 'feedLink') {
            notification.href = notification.links[j].href;
          }
        }
        notification.data = notification.title + " " + notification.data;
        notification.titleText = 'Family Tree Alert';
        notification.image = 'family-tree.png';
        notification.changeTime = new Date(notification.updated);
        //console.log("notification: ", notification)
      }
    }
    console.log("notifications: ", notifications)
    return notifications;
  }

  function processTreeChanges(changes) {
    var changeArray = [];
    for(var i=0; i<changes.length; i++) {
      console.log("changes[i]: ", changes[i])
      if(changes[i].data.changes) {
        for(var j=0; j<changes[i].data.changes.length; j++) {
          if(changes[i].data.changes[j]) {
            var change = changes[i].data.changes[j];
            console.log("notification: ", change)
            change.titleText = "Family Tree Alert";
            change.titleText += ' - ' + FB.Util.getTreeText(change.type);
            change.fields = [];
            change.href = '#';
            if(change.conclusion) {
              change.fields.push({'label': 'Title:', 'value': change.conclusion.details.title});
              change.fields.push({'label': 'Name Type:', 'value': change.conclusion.details.nameType});
              change.fields.push({'label': 'Name:', 'value': change.conclusion.details.fullText});
              if(change.conclusion.details.relationshipId) {
                change.href = treePersonURL + change.conclusion.details.relationshipId;
              }
            }
            change.fields.push({'label': 'Date:', 'value': change.timeStampDisplay});
            if(change.contributor) {
              change.fields.push({'label': 'by:', 'value': change.contributor.name});
            }

            change.image = 'family-tree.png';
            change.changeTime = new Date(change.timeStamp);
            console.log("change: ", change)
            changeArray.push(change);
          }
        }
      }
      console.log("notifications: ", changes)
    }
    return changeArray;
  }

  var service = {

    getWatches: function(cisUserId) {
      var deferred = $q.defer();
      var successResults = [];

      $http.get('/watch/watches?watcher=' + cisUserId).
          success(function(data, status, headers, config) {
            console.log("watchers: ", data)
            //console.log("alerts json: " + JSON.stringify(data.alerts[0]))
//            var sub = deferred.promise.then(function() {
//              $http.get(data.watch[0].resourceId).
//                  success(function(data, status, headers, config) {
//
//                    sub.resolve(processNotifications(data));
//                  })
//                  .error(function(data, status, headers, config) {
//                    sub.reject(status);
//                  });
//            });
            var promiseArray = [];
            for(var i=0; i<data.watch.length; i++) {
              //console.log("notification loop: ", data.watch[i]);
              //var atomURL = watchAtomURL + data.watch[i].resourceId;
              var treeURL = treeDataURL + data.watch[i].resourceId.replace(/_.*/, '') + "?tz=360&locale";
              console.log("notification url: " + treeURL)
              var cookieContent = "fssessionid=" + user.sessionId + "; ftsessionid=" + user.sessionId;
              //    console.log("Cookie Content: " + cookieContent);

              var headers = {headers: {'Cookie': cookieContent}};
              promiseArray.push($http.get(treeURL).
                  success(function(data, status, headers, config) {
                    //console.log("atom feed: ", data);
                    successResults = successResults.concat(data);
                  })
                  .error(function(data, status, headers, config) {
                    console.log("ERROR getting atom feed url: " + config.url);
                  }));
            }
            FB.Promise.all($q, promiseArray).then(function(results) {
              console.log("final results: ", successResults);
              deferred.resolve(processTreeChanges(successResults));
            },
            function(event) {
              console.log("final results error: ", successResults);
              if(results.length === 0) {
                deferred.reject(404);
              }
              deferred.resolve(processTreeChanges(successResults));
            });
            //successcb(processAlerts(data.alerts));
          })
          .error(function(data, status, headers, config) {
            deferred.reject(status);
            console.log("Error getting watches", data, status, headers, config);
          });

      return deferred.promise;
    },

    getWatchesStatic: function(cisUserId) {
      var response = {
          "watch": [{
          "id": 1366394,
          "createdDate": 1329709307000,
          "updatedDate": 1329709307000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "KP9T-L2V_p_fs-ft_production-primary"
        }, {
          "id": 1366416,
          "createdDate": 1329710092000,
          "updatedDate": 1329710092000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "MXCW-VW4_p_fs-ft_production-primary"
        }, {
          "id": 1383033,
          "createdDate": 1331246385000,
          "updatedDate": 1331246385000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "LZNF-CGC_p_fs-ft_production-primary"
        }, {
          "id": 1651225,
          "createdDate": 1355107152000,
          "updatedDate": 1355107152000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "MXCW-V49_p_fs-ft_production-primary"
        }, {
          "id": 1685988,
          "createdDate": 1357527570000,
          "updatedDate": 1357527570000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "KJCV-C8M_p_fs-ft_production-primary"
        }, {
          "id": 1686329,
          "createdDate": 1357537303000,
          "updatedDate": 1357537303000,
          "title": "Person Watch",
          "atomFeedUri": null,
          "watcherType": "U",
          "watcherId": "cis.user.MMMM-V7PM",
          "activated": false,
          "interestLevel": "M",
          "watchSource": null,
          "resourceIdURLStr": null,
          "resourceId": "KWJK-DQY_p_fs-ft_production-primary"
        }]
      }

      return processNotifications(response.watch);
    },

    getNotificationsStatic: function (cisUserId) {
      var notifications = [{
        "status":"OK",
        "statusText":"OK",
        "data":{
          "changes":[
            {
              "id":"D8LM-WGQ",
              "parentId":null,
              "parentChangeType":null,
              "type":"DELETE_PERSON_SOURCE_REFERENCE",
              "restorable":false,
              "currentChange":false,
              "deleted":true,
              "conclusion":{
                "id":null,
                "justification":"",
                "contributor":null,
                "details":{
                  "detailsType":"SourceDetails",
                  "uri":"MMQN-X6N",
                  "referenceType":"",
                  "justification":null,
                  "title":"Brigham J Liechty, United States Census, 1940",
                  "conclusionTypes":[

                  ],
                  "sourceReferenceId":"fs-ft.ctpsr.MMSR-B1J",
                  "father":null,
                  "mother":null,
                  "child":null,
                  "relationshipId":"KWCB-344",
                  "detailsType":"SourceDetails"
                },
                "type":null,
                "multiValued":false
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MM61-LXM",
                "name":"MarvinPEvans",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1370195337819,
              "timeStampDisplay":"2 June 2013",
              "comments": [
                {
                  user: {name: "John Liechty", image: 'john.jpg'},
                  updated: "about an hour ago",
                  text: "I have been looking for that source."
                },
                {
                  user: {name: "Brian Liechty", image: 'brian.jpg'},
                  updated: "about an hour ago",
                  text: "Nice find"
                }
              ]
            },
            {
              "id":"D821-Y6W",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_PERSON_SOURCE_REFERENCE",
              "restorable":true,
              "currentChange":false,
              "deleted":false,
              "conclusion":{
                "id":null,
                "justification":"To verify who was living in the Liechty household in 1940 and where they lived.",
                "contributor":null,
                "details":{
                  "detailsType":"SourceDetails",
                  "uri":"MMQN-X6N",
                  "referenceType":"",
                  "justification":null,
                  "title":"Brigham J Liechty, &quot;United States Census, 1940&quot;",
                  "conclusionTypes":[

                  ],
                  "sourceReferenceId":"fs-ft.ctpsr.MMSR-B1J",
                  "father":null,
                  "mother":null,
                  "child":null,
                  "relationshipId":"KWCB-344",
                  "detailsType":"SourceDetails"
                },
                "type":null,
                "multiValued":false
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MM61-LXM",
                "name":"MarvinPEvans",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1370194991278,
              "timeStampDisplay":"2 June 2013"
            },
            {
              "id":"D87R-P8Y",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_PERSON_SOURCE_REFERENCE",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":null,
                "justification":null,
                "contributor":null,
                "details":{
                  "detailsType":"SourceDetails",
                  "uri":"MMQC-8N3",
                  "referenceType":"",
                  "justification":null,
                  "title":"Brigham J Liechty, &quot;United States Census, 1940&quot;",
                  "conclusionTypes":[

                  ],
                  "sourceReferenceId":"fs-ft.ctpsr.MMSL-JZ3",
                  "father":null,
                  "mother":null,
                  "child":null,
                  "relationshipId":"KWCB-344",
                  "detailsType":"SourceDetails"
                },
                "type":null,
                "multiValued":false
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMD6-62S",
                "name":"Patrick Liechty",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1369419723965,
              "timeStampDisplay":"24 May 2013"
            },
            {
              "id":"ZQ33-MWL",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_LINEAGE",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":"R.777-7771",
                "justification":"Brigham Jacob was born to Abraham Brigham Liechty and his first wife Ida.  He was their first born.  Ida died shortly after the birth of their third child Heber.  Abraham Brigham later married Louise Reinwald.",
                "contributor":{
                  "id":"MM64-R9C",
                  "name":"annavery",
                  "date":"28 October 2012",
                  "timestamp":"2012-10-28T15:39:36+00:00"
                },
                "details":{
                  "detailsType":"LineageConclusionDetails",
                  "relationshipId":"MDQK-WNX",
                  "father":{
                    "id":"KWCJ-2W5",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Abraham Brigham Liechty",
                    "gender":"MALE",
                    "lifeSpan":"1870-1963",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "mother":{
                    "id":"KWCJ-2WR",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Frederikka Louise Reinwald",
                    "gender":"FEMALE",
                    "lifeSpan":"1875-1962",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "originalFather":{
                    "id":"KWCJ-2W5",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Abraham Brigham Liechty",
                    "gender":"MALE",
                    "lifeSpan":"1870-1963",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "originalMother":{
                    "id":"KWCJ-2WR",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Frederikka Louise Reinwald",
                    "gender":"FEMALE",
                    "lifeSpan":"1875-1962",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "child":{
                    "id":"KWCB-344",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Brigham Jacob Liechty",
                    "gender":"MALE",
                    "lifeSpan":"1897-1969",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "originalChild":{
                    "id":"KWCB-344",
                    "lifeSpanDates":"",
                    "isDeleted":false,
                    "name":"Brigham Jacob Liechty",
                    "gender":"MALE",
                    "lifeSpan":"1897-1969",
                    "isLiving":false,
                    "deleted":false,
                    "living":false
                  },
                  "type":null,
                  "date":null,
                  "title":"STEP",
                  "detailsType":"LineageConclusionDetails"
                },
                "type":"MOTHER_LINEAGE",
                "multiValued":true
              },
              "parentConclusion":null,
              "classification":"PARENT_CHILD",
              "contributor":{
                "id":"MM64-R9C",
                "name":"annavery",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1351438776850,
              "timeStampDisplay":"28 October 2012"
            },
            {
              "id":"SGXK-F3R",
              "parentId":null,
              "parentChangeType":null,
              "type":"EDIT_PREFERRED_NAME",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":"V.777-777N",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"22 May 2012",
                  "timestamp":"2012-05-22T15:40:21+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Liechty",
                  "preferredName":true,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Liechty",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Liechty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"NAME",
                "multiValued":false
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            },
            {
              "id":"SGXK-F3J",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_ALTERNATE_NAME",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":"N.777-777N",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"22 May 2012",
                  "timestamp":"2012-05-22T15:40:20+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Liechty ",
                  "preferredName":false,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Liechty ",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Liechty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"ALTERNATE_NAME",
                "multiValued":true
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            },
            {
              "id":"SGXK-X1P",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_ALTERNATE_NAME",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":"N.777-7771",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"22 May 2012",
                  "timestamp":"2012-05-22T15:40:20+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Liechty",
                  "preferredName":false,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Liechty",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Liechty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"ALTERNATE_NAME",
                "multiValued":true
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            },
            {
              "id":"SGXK-X1J",
              "parentId":null,
              "parentChangeType":null,
              "type":"ADD_ALTERNATE_NAME",
              "restorable":false,
              "currentChange":true,
              "deleted":false,
              "conclusion":{
                "id":"N.777-7774",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"22 May 2012",
                  "timestamp":"2012-05-22T15:40:20+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Leichty",
                  "preferredName":false,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Leichty",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Leichty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"ALTERNATE_NAME",
                "multiValued":true
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            },
            {
              "id":"SGXK-X18",
              "parentId":null,
              "parentChangeType":null,
              "type":"DELETE_ALTERNATE_NAME",
              "restorable":false,
              "currentChange":false,
              "deleted":true,
              "conclusion":{
                "id":"N.777-777P",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"3 May 2012",
                  "timestamp":"2012-05-03T18:23:17+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Leichty",
                  "preferredName":false,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Leichty",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Leichty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"ALTERNATE_NAME",
                "multiValued":true
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            },
            {
              "id":"SGXK-X1Z",
              "parentId":null,
              "parentChangeType":null,
              "type":"EDIT_PREFERRED_NAME",
              "restorable":true,
              "currentChange":false,
              "deleted":false,
              "conclusion":{
                "id":"V.777-777N",
                "justification":"",
                "contributor":{
                  "id":"MMMM-MM6",
                  "name":"FamilySearch",
                  "date":"22 May 2012",
                  "timestamp":"2012-05-22T15:40:20+00:00"
                },
                "details":{
                  "detailsType":"NameDetails",
                  "style":"EUROTYPIC",
                  "nameType":"BIRTH",
                  "fullText":"Brigham Jacob Leichty",
                  "preferredName":true,
                  "nameForms":[
                    {
                      "fullText":"Brigham Jacob Leichty",
                      "prefixPart":null,
                      "suffixPart":null,
                      "familyPart":"Leichty",
                      "givenPart":"Brigham Jacob",
                      "script":"UNSPECIFIED"
                    }
                  ],
                  "detailsType":"NameDetails"
                },
                "type":"NAME",
                "multiValued":false
              },
              "parentConclusion":null,
              "classification":"PERSON",
              "contributor":{
                "id":"MMMM-MM6",
                "name":"FamilySearch",
                "date":null,
                "timestamp":null
              },
              "timeStamp":1337701220707,
              "timeStampDisplay":"22 May 2012"
            }
          ],
          "lastPage":false,
          "nextContextChangeId":"SGXK-X1Z",
          "nextParentChangeId":null,
          "nextParentChangeType":null
        },
        "statuses":null
      }]
      return processTreeChanges(notifications);
    },

    getNotifications: function(cisUserId) {
      var params = {watcher: cisUserId};
      $http.get('https://familysearch.org/watch/watches', params).
          success(function(data, status, headers, config) {

//
//            $http.get('https://familysearch.org/watch/watches', params).
//                success(function(data, status, headers, config) {
//                  return data;
//                }).
//                error(function(data, status, headers, config) {
//                  alert("Error getting watchNotify data status: " + status);
//                });
          }).
          error(function(data, status, headers, config) {
            alert("Error getting watchNotify data status: " + status);
          });
    }
  }

  return service;
});