fambookApp.factory('watchNotifyService', function($http, $q) {
  var watchAtomURL = "https://familysearch.org/watch/atom/";

  function processNotifications(watchers) {
    var notifications = watchers;
    for(var i=0; i<notifications.length; i++) {
      if(notifications[i]) {
        var notification = notifications[i];
        for(var j=0; j<notification.links.length; j++) {
          if(notification.links[j].rel === 'feedLink') {
            notification.href = notification.links[j].href;
          }
        }
        notification.data = notification.title;
        notification.title = 'Family Tree Change';
        notification.image = 'family-tree.png';
        //console.log("notification: ", notification)
      }
    }
    console.log("notifications: ", notifications)
    return notifications;
  }

  var service = {

    getWatches: function(cisUserId) {
      var deferred = $q.defer();
      var successResults = [];

      $http.get('https://familysearch.org/watch/watches?watcher=cis.user.MMMM-V7PM').
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
              var atomURL = watchAtomURL + data.watch[i].resourceId;
              //console.log("notification url: " + atomURL)
              promiseArray.push($http.get(atomURL).
                  success(function(data, status, headers, config) {
                    console.log("atom feed: ", data);
                    successResults = successResults.concat(data);
                  })
                  .error(function(data, status, headers, config) {
                    console.log("ERROR getting atom feed url: " + config.url);
                  }));
            }
            FB.Promise.all($q, promiseArray).then(function(results) {
              console.log("final results: ", successResults);
              deferred.resolve(processNotifications(successResults));
            },
            function(event) {
              console.log("final results error: ", successResults);
              if(results.length === 0) {
                deferred.reject(404);
              }
              deferred.resolve(processNotifications(successResults));
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
      var deferred = $q.defer();
      var notifications = {notifications: [
        {
          "title": "Hannah White (p.KP9T-L2V)",
          "subtitle": "Hannah White (p.KP9T-L2V)",
          "categories": [],
          "updated": 1338790968000,
          "id": "http://new.familysearch.org/watch/atom/KP9T-L2V_p_fs-ft_production-primary",
          "links": [{
            "base": null,
            "extensionAttributes": {},
            "href": "http://new.familysearch.org/watch/atom/KP9T-L2V_p_fs-ft_production-primary",
            "rel": "self",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }, {
            "base": null,
            "extensionAttributes": {},
            "href": "KP9T-L2V_p_fs-ft_production-primary",
            "rel": "resourceId",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }, {
            "base": null,
            "extensionAttributes": {},
            "href": "http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.KP9T-L2V&svtab=8&svfs=1",
            "rel": "feedLink",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }],
          "author": [{
            "base": null,
            "extensionAttributes": {},
            "lang": null
          }],
          "contributor": [],
          "icon": "https://new.familysearch.org/en/images/thumbnail_newfs.gif",
          "logo": "https://new.familysearch.org/en/images/logo_fs.gif",
          "generator": null,
          "base": null,
          "extensionAttributes": {
            "templateId": "person",
            "emailLineText": "Hannah White (p.KP9T-L2V)\n\n-------------------------------------------------\n",
            "baseDir": "http://new.familysearch.org",
            "name": "Hannah White",
            "emailLineHtml": "<h2 style=\"margin:0;padding:0;color:#5a5147;font-family:Palatino,'Palatino Linotype','Palatino LT STD','Book Antiqua',Georgia,serif;font-weight:normal;font-size:18px;line-height:54px;\"><a href=\"http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.KP9T-L2V&svtab=8&svfs=1\" style=\"color:#5a5147;text-decoration:none;\">Hannah White (p.KP9T-L2V)</a></h2>",
            "pid": "p.KP9T-L2V"
          },
          "entries": [],
          "lang": null
        },
        {
          "title": "Hannah Parker (p.MXCW-VW4)",
          "subtitle": "Hannah Parker (p.MXCW-VW4)",
          "categories": [],
          "updated": 1337710957000,
          "id": "http://new.familysearch.org/watch/atom/MXCW-VW4_p_fs-ft_production-primary",
          "links": [{
            "base": null,
            "extensionAttributes": {},
            "href": "http://new.familysearch.org/watch/atom/MXCW-VW4_p_fs-ft_production-primary",
            "rel": "self",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }, {
            "base": null,
            "extensionAttributes": {},
            "href": "MXCW-VW4_p_fs-ft_production-primary",
            "rel": "resourceId",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }, {
            "base": null,
            "extensionAttributes": {},
            "href": "http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.MXCW-VW4&svtab=8&svfs=1",
            "rel": "feedLink",
            "type": null,
            "hreflang": null,
            "title": null,
            "length": null,
            "lang": null
          }],
          "author": [{
            "base": null,
            "extensionAttributes": {},
            "lang": null
          }],
          "contributor": [],
          "icon": "https://new.familysearch.org/en/images/thumbnail_newfs.gif",
          "logo": "https://new.familysearch.org/en/images/logo_fs.gif",
          "generator": null,
          "base": null,
          "extensionAttributes": {
            "templateId": "person",
            "emailLineText": "Hannah Parker (p.MXCW-VW4)\n\n-------------------------------------------------\n",
            "baseDir": "http://new.familysearch.org",
            "name": "Hannah Parker",
            "emailLineHtml": "<h2 style=\"margin:0;padding:0;color:#5a5147;font-family:Palatino,'Palatino Linotype','Palatino LT STD','Book Antiqua',Georgia,serif;font-weight:normal;font-size:18px;line-height:54px;\"><a href=\"http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.MXCW-VW4&svtab=8&svfs=1\" style=\"color:#5a5147;text-decoration:none;\">Hannah Parker (p.MXCW-VW4)</a></h2>",
            "pid": "p.MXCW-VW4"
          },
          "entries": [],
          "lang": null
        },
        {
        "title": "Robert White (p.LZNF-CGC)",
        "subtitle": "Robert White (p.LZNF-CGC)",
        "categories": [],
        "updated": 1337711861000,
        "id": "http://new.familysearch.org/watch/atom/LZNF-CGC_p_fs-ft_production-primary",
        "links": [{
          "base": null,
          "extensionAttributes": {},
          "href": "http://new.familysearch.org/watch/atom/LZNF-CGC_p_fs-ft_production-primary",
          "rel": "self",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }, {
          "base": null,
          "extensionAttributes": {},
          "href": "LZNF-CGC_p_fs-ft_production-primary",
          "rel": "resourceId",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }, {
          "base": null,
          "extensionAttributes": {},
          "href": "http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.LZNF-CGC&svtab=8&svfs=1",
          "rel": "feedLink",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }],
        "author": [{
          "base": null,
          "extensionAttributes": {},
          "lang": null
        }],
        "contributor": [],
        "icon": "https://new.familysearch.org/en/images/thumbnail_newfs.gif",
        "logo": "https://new.familysearch.org/en/images/logo_fs.gif",
        "generator": null,
        "base": null,
        "extensionAttributes": {
          "templateId": "person",
          "emailLineText": "Robert White (p.LZNF-CGC)\n\n-------------------------------------------------\n",
          "baseDir": "http://new.familysearch.org",
          "name": "Robert White",
          "emailLineHtml": "<h2 style=\"margin:0;padding:0;color:#5a5147;font-family:Palatino,'Palatino Linotype','Palatino LT STD','Book Antiqua',Georgia,serif;font-weight:normal;font-size:18px;line-height:54px;\"><a href=\"http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.LZNF-CGC&svtab=8&svfs=1\" style=\"color:#5a5147;text-decoration:none;\">Robert White (p.LZNF-CGC)</a></h2>",
          "pid": "p.LZNF-CGC"
        },
        "entries": [],
        "lang": null
      },
      {
        "title": "Caroline Zimmer (p.KJCV-C8M)",
        "subtitle": "Caroline Zimmer (p.KJCV-C8M)",
        "categories": [],
        "updated": 1310070546000,
        "id": "http://new.familysearch.org/watch/atom/KJCV-C8M_p_fs-ft_production-primary",
        "links": [{
          "base": null,
          "extensionAttributes": {},
          "href": "http://new.familysearch.org/watch/atom/KJCV-C8M_p_fs-ft_production-primary",
          "rel": "self",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }, {
          "base": null,
          "extensionAttributes": {},
          "href": "KJCV-C8M_p_fs-ft_production-primary",
          "rel": "resourceId",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }, {
          "base": null,
          "extensionAttributes": {},
          "href": "http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.KJCV-C8M&svtab=8&svfs=1",
          "rel": "feedLink",
          "type": null,
          "hreflang": null,
          "title": null,
          "length": null,
          "lang": null
        }],
        "author": [{
          "base": null,
          "extensionAttributes": {},
          "lang": null
        }],
        "contributor": [],
        "icon": "https://new.familysearch.org/en/images/thumbnail_newfs.gif",
        "logo": "https://new.familysearch.org/en/images/logo_fs.gif",
        "generator": null,
        "base": null,
        "extensionAttributes": {
          "templateId": "person",
          "emailLineText": "Caroline Zimmer (p.KJCV-C8M)\n\n-------------------------------------------------\n",
          "baseDir": "http://new.familysearch.org",
          "name": "Caroline Zimmer",
          "emailLineHtml": "<h2 style=\"margin:0;padding:0;color:#5a5147;font-family:Palatino,'Palatino Linotype','Palatino LT STD','Book Antiqua',Georgia,serif;font-weight:normal;font-size:18px;line-height:54px;\"><a href=\"http://new.familysearch.org/en/action/hourglassiconicview?bookid=p.KJCV-C8M&svtab=8&svfs=1\" style=\"color:#5a5147;text-decoration:none;\">Caroline Zimmer (p.KJCV-C8M)</a></h2>",
          "pid": "p.KJCV-C8M"
        },
        "entries": [],
        "lang": null
      }]};

      setTimeout(function(){
        deferred.resolve(processNotifications(notifications.notifications));
      }), 200);
      return deferred.promise;
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