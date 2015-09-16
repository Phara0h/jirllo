var prompt = require('prompt');
var config = require('config');
var Trello = require("trello");
var JiraApi = require('jira').JiraApi;
var open = require('open');

var propsNeeded = [];
var trello;
var jira;

if(!config.has("trello.key"))
  propsNeeded.push("trello.key");
if(!config.has("trello.token"))
{
    open("https://trello.com/1/connect?key="+config.get("trello.key")+"&name=jirllo&response_type=token&scope=read,write&expiration=never")
    propsNeeded.push("trello.token");
}
if(!config.has("jira.host"))
    propsNeeded.push("jira.host");
if(!config.has("jira.port"))
    propsNeeded.push("jira.port");
if(!config.has("jira.user"))
    propsNeeded.push("jira.user");
if(!config.has("jira.password"))
    propsNeeded.push({name: '"jira.password"',hidden: true});

prompt.addProperties(config,propsNeeded, function (err) {
  console.error(err);
  init();
});
prompt.start();

function init()
{
    trello = new Trello(config.trello.key, config.trello.token);
    jira = new JiraApi('https', config.jira.host, config.jira.port, config.jira.user, config.jira.password, '2.0.alpha1');

    trello.getBoards("me", function (error, trelloBoards){
      if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('boards:', trelloBoards);
          }
    });

}
