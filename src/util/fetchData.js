import Vue from 'vue'

export default {
  getTopics (tab, pageNo, pageSize){
    let requestUrl = `/api/v1/topics?tab=${tab}&page=${pageNo}&limit=${pageSize}`
    return fetchData(requestUrl);
  },
  getTopicInfo (tid){
    let requestUrl = `/api/v1/topic/${tid}`;
    return fetchData(requestUrl);
  },
  login(accesstoken){
    let requestUrl = `/api/v1/accesstoken`;
    return fetchData(requestUrl,"post",{accesstoken:accesstoken});
  },
  userInfo(loginname){
    let requestUrl = `/api/v1/user/${loginname}`;
    return fetchData(requestUrl);
  },
  setRepliy(topic_id,accesstoken,content,reply_id){
    let requestUrl = `/api/v1/topic/${topic_id}/replies`;
    if(!reply_id){
      return fetchData(requestUrl,"post",{accesstoken:accesstoken,content:content});
    }else{
      return fetchData(requestUrl,"post",{accesstoken:accesstoken,content:content,reply_id:reply_id});
    }
  },
  ups(replyId,accesstoken){
    let requestUrl = `/api/v1/reply/${replyId}/ups`;
     return fetchData(requestUrl,"post",{accesstoken:accesstoken});
  },
  publish(accesstoken,title,tab,content){
    let requestUrl = `/api/v1/topics`;
     return fetchData(requestUrl,"post",{accesstoken:accesstoken,title:title,tab:tab,content:content});
  },
 getMessages(accesstoken,mdrender){
    let requestUrl = `/api/v1/messages?accesstoken=${accesstoken}&mdrender=${mdrender}`;
    return fetchData(requestUrl);
  },
  getMessageCount(accesstoken){
    let requestUrl = `/api/v1/message/count?accesstoken=${accesstoken}`;
    return fetchData(requestUrl);
  }
}


function fetchData(url, method, data) {
  data = data || {};
  method = method || 'get';
  return Vue.http[method](url, data, {
    emulateJSON: true
  })
    .then(res => {
      if (res.ok === true) {
        return res.body;
      }
      return null;
    })
    .catch(err => {
      console.log(err, 'error');
      return null;
    })
}


