fambookApp.factory('soiService', function($http, $q) {
  var artifactManagerURL = 'https://familysearch.org/artifactmanager/artifacts/';
  var photosImageURL = 'https://familysearch.org/photos/images/';

  function processAlerts(alerts) {
    for(var i=0; i<alerts.length; i++) {
      var alert = alerts[i];
      alert.context = JSON.parse(alerts[i].context);
      if(alert.applicationID === 'engage.artifactmanager') {
        alert.title = 'Photos Alert';
        if(alert.alertType === 'artifact.added') {
          alert.title += " - Artifact Added";
        }
        alert.image = 'photos.png';
        if(alert.context.artifactId) {
          alert.url = artifactManagerURL + alert.context.artifactId;
          alert.href = photosImageURL + alert.context.artifactId;
        }
        //alert.imageHeight = '89';
        //alert.imageWidth = '95';
      }
      console.log("alert: ", alert)
      alerts[i].context = alert.context;
    }
    return alerts;
  }

  var service = {

    getAlertsStatic: function(cisUserId) {
      var response = {
        "links": [{
          "href": "https://familysearch.org/alertservice/alert/user/cis.user.MMMM-V7PM",
          "rel": "self",
          "type": null
        }, {
          "href": "https://familysearch.org/alertservice/summary/cis.user.MMMM-V7PM",
          "rel": "relations/userAlertSummary",
          "type": null
        }],
        "templates": [{
          "pattern": "https://familysearch.org/alertservice/alert/user/{userid}{?appid,resource,status,type}",
          "type": null,
          "rel": "templates/alertsForUser"
        }],
        "alerts": [{
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007841",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007841,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:02:37.000+0000",
          "updateTime": "2013-06-03T14:02:37.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/850635",
          "context": "{\"id\":716401,\"x\":0.34472933,\"y\":0.20790021,\"width\":0.28490028,\"height\":0.20790021,\"taggedPersonId\":432677,\"artifactId\":1018019,\"portraitArtifactId\":1018027,\"contributorPatronId\":167550,\"title\":\"John Graham\",\"autoGenerated\":false,\"editableByCaller\":false,\"deletableByCaller\":false,\"uploaderId\":167550}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007842",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007842,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:02:39.000+0000",
          "updateTime": "2013-06-03T14:02:39.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/805536",
          "context": "{\"id\":679097,\"x\":0.35843793,\"y\":0.07554672,\"width\":0.29428172,\"height\":0.20974155,\"taggedPersonId\":412796,\"artifactId\":969099,\"portraitArtifactId\":0,\"contributorPatronId\":1480,\"title\":\"Clara Kage\",\"autoGenerated\":false,\"editableByCaller\":false,\"deletableByCaller\":false,\"uploaderId\":1480}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007850",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007850,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:02:45.000+0000",
          "updateTime": "2013-06-03T14:02:45.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/723693",
          "context": "{\"id\":609930,\"x\":0.0,\"y\":0.0,\"width\":1.0,\"height\":1.0,\"taggedPersonId\":376615,\"artifactId\":876786,\"portraitArtifactId\":0,\"contributorPatronId\":113838,\"title\":\"Lars Christian Christensen\",\"autoGenerated\":false,\"editableByCaller\":false,\"deletableByCaller\":false,\"uploaderId\":113838}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007863",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007863,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:02:48.000+0000",
          "updateTime": "2013-06-03T14:02:48.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/277076",
          "context": "{\"id\":389835,\"x\":0.3514563,\"y\":0.0,\"width\":0.5339806,\"height\":0.40087464,\"taggedPersonId\":149709,\"artifactId\":578547,\"portraitArtifactId\":0,\"contributorPatronId\":9981,\"title\":\"Beth Cannon\",\"autoGenerated\":false,\"uploaderId\":9981,\"editableByCaller\":false,\"deletableByCaller\":false}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007878",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007878,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:02:52.000+0000",
          "updateTime": "2013-06-03T14:02:52.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/875231",
          "context": "{\"photoTagId\":744450,\"taggedPersonId\":447103,\"artifactId\":1052761,\"portraitArtifactId\":0,\"contributorPatronId\":186400,\"treePersonId\":\"KWZZ-MQM\",\"name\":\"Rowe, Barbara Ann Christensen\"}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007911",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007911,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:03:01.000+0000",
          "updateTime": "2013-06-03T14:03:01.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/679458",
          "context": "{\"id\":574688,\"x\":0.49861112,\"y\":0.0,\"width\":0.49861112,\"height\":0.6970874,\"taggedPersonId\":150037,\"artifactId\":365599,\"portraitArtifactId\":0,\"contributorPatronId\":10421,\"title\":\"Abram Christensen\",\"autoGenerated\":false,\"deletableByCaller\":false,\"uploaderId\":10421,\"editableByCaller\":false}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007914",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007914,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:03:04.000+0000",
          "updateTime": "2013-06-03T14:03:04.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/831894",
          "context": "{\"id\":701430,\"x\":0.03,\"y\":0.09726444,\"width\":0.825,\"height\":0.50151974,\"taggedPersonId\":58309,\"artifactId\":997857,\"portraitArtifactId\":0,\"contributorPatronId\":1480,\"title\":\"Peter Wilhelm Johnson\",\"autoGenerated\":false,\"uploaderId\":1480,\"deletableByCaller\":false,\"editableByCaller\":false}",
          "contextMediaType": "application/json"
        }, {
          "links": [{
            "href": "https://familysearch.org/alertservice/alert/2007918",
            "rel": "relations/alert",
            "type": null
          }],
          "templates": [],
          "id": 2007918,
          "userID": "cis.user.MMMM-V7PM",
          "applicationID": "engage.artifactmanager",
          "creationTime": "2013-06-03T14:03:06.000+0000",
          "updateTime": "2013-06-03T14:03:06.000+0000",
          "alertType": "artifact.added",
          "status": "NEW",
          "resourceURI": "https://familysearch.org/scopeservice/soi/action/1024603",
          "context": "{\"photoTagId\":870867,\"taggedPersonId\":512266,\"artifactId\":1210881,\"portraitArtifactId\":0,\"contributorPatronId\":154035,\"treePersonId\":\"KWCX-VK1\",\"name\":\"Ephraim Taylor\"}",
          "contextMediaType": "application/json"
        }]
      }

      return processAlerts(response.alerts);
    },

    getAlerts: function(cisUserId) {
      var deferred = $q.defer();

      $http.get('https://familysearch.org/alertservice/alert/user/cis.user.MMMM-V7PM',
          {headers:{'Authorization': 'Bearer USYS595C8717366D82D13383BF1873E58970_idses-prod02.a.fsglobal.net'}}).
          success(function(data, status, headers, config) {
            //console.log("alerts json: " + JSON.stringify(data.alerts[0]))
            deferred.resolve(processAlerts(data.alerts));
            //successcb(processAlerts(data.alerts));
          })
          .error(function(data, status, headers, config) {
            deferred.reject(status);
            console.log("Error getting soiService", data, status, headers, config);
          });

      return deferred.promise;
    }
  }

  return service;
});