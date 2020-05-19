'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する
 * @parem {HTMLElement} element HTML の要素
 */
function removeAllChildren(element){
    while (element.firstChild){ //elementに子要素がある限り削除。elementは、getElementByIdで呼び出した上記４つの要素
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        return; // 直ちに関数の処理を終了するガード句
    } 
    console.log(userName);


    
    removeAllChildren(resultDivided);//resultDividedの子要素を全部消す
        
    const result = assessment(userName);//診断結果取得

　　//HTMLを足していく
　　const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    removeAllChildren(tweetDivided);//tweetDividedの子要素を全部消す
      
    //TODO ツイートエリアの作成
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あんたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    
    anchor.setAttribute('href',hrefValue);//属性追加
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    
    //twttr.widgets.load();←←下の４行と置き換え（ＨＴＭＬの方も１行コメントアウト）
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    script.setAttribute('charset','utf-8');
    tweetDivided.appendChild(script);


};


userNameInput.onkeyup = (event) => {
    if (event.key === 'Enter'){
       assessmentButton.onclick() //TODO　ボタンの onclick()処理を呼び出す
    }
};


const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
]
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前　（ストリングは文字列の意味）
 * @param {string} 診断結果
 */
 
function assessment(userName) {
    // 全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for ( let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i)
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName); //正規表現（/word/g）を使って文字列を置き換えている。ｇはグローバル関数と言ってリプレイスを複数回適用するためのもの
    
    return result;
}
console.log(assessment('工藤修一'))

console.assert(
    assessment('enuyobi2020') === 'enuyobi2020のいいところは見た目です。内側から溢れ出るenuyobi2020の良さに皆が気を惹かれます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
