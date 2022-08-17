$(function () {

  var h = $(window).height();
  $('#loading ,#spinner').height(h).css('display','block');

  const OVERALL = ['wins','top10','top25','kills','killsPerMin','killsPerMatch','minutesPlayed','matches','winRate'];
  const SOLO = ['wins','top10','top25','kills','killsPerMin','killsPerMatch','minutesPlayed','matches','winRate'];
  const DUO = ['wins','top5','top12','kills','killsPerMin','killsPerMatch','minutesPlayed','matches','winRate'];
  const SQUAD = ['wins','top3','top6','kills','killsPerMin','killsPerMatch','minutesPlayed','matches','winRate'];

      const data = {"account":{"id":"16fe7819dbee44659bd9bd9c711287bc","name":"イシゴ-145"},"battlePass":{"level":220,"progress":83},"image":null,"stats":{"all":{"overall":{"score":383494,"scorePerMin":28.481,"scorePerMatch":287.261,"wins":126,"top3":227,"top5":55,"top6":354,"top10":68,"top12":95,"top25":108,"kills":3642,"killsPerMin":0.27,"killsPerMatch":2.728,"deaths":1209,"kd":3.012,"matches":1335,"winRate":9.438,"minutesPlayed":13465,"playersOutlived":75807,"lastModified":"2022-08-16T17:14:54Z"},"solo":{"score":56318,"scorePerMin":28.075,"scorePerMatch":277.429,"wins":6,"top10":68,"top25":108,"kills":568,"killsPerMin":0.283,"killsPerMatch":2.798,"deaths":197,"kd":2.883,"matches":203,"winRate":2.956,"minutesPlayed":2006,"playersOutlived":13023,"lastModified":"2022-08-15T16:56:08Z"},"duo":{"score":54775,"scorePerMin":27.989,"scorePerMatch":300.962,"wins":15,"top5":55,"top12":95,"kills":597,"killsPerMin":0.305,"killsPerMatch":3.28,"deaths":167,"kd":3.575,"matches":182,"winRate":8.242,"minutesPlayed":1957,"playersOutlived":11811,"lastModified":"2022-08-15T14:19:41Z"},"trio":null,"squad":{"score":243090,"scorePerMin":26.911,"scorePerMatch":296.451,"wins":105,"top3":227,"top6":354,"kills":2431,"killsPerMin":0.269,"killsPerMatch":2.965,"deaths":715,"kd":3.4,"matches":820,"winRate":12.805,"minutesPlayed":9033,"playersOutlived":50973,"lastModified":"2022-08-16T17:14:54Z"},"ltm":{"score":87273,"scorePerMin":32.871,"scorePerMatch":258.97,"wins":20,"kills":673,"killsPerMin":0.253,"killsPerMatch":1.997,"deaths":317,"kd":2.123,"matches":337,"winRate":5.935,"minutesPlayed":2655,"playersOutlived":12539,"lastModified":"2022-08-16T16:20:31Z"}},"keyboardMouse":null,"gamepad":{"overall":{"score":383494,"scorePerMin":28.481,"scorePerMatch":287.261,"wins":126,"top3":227,"top5":55,"top6":354,"top10":68,"top12":95,"top25":108,"kills":3642,"killsPerMin":0.27,"killsPerMatch":2.728,"deaths":1209,"kd":3.012,"matches":1335,"winRate":9.438,"minutesPlayed":13465,"playersOutlived":75807,"lastModified":"2022-08-16T17:14:54Z"},"solo":{"score":56318,"scorePerMin":28.075,"scorePerMatch":277.429,"wins":6,"top10":68,"top25":108,"kills":568,"killsPerMin":0.283,"killsPerMatch":2.798,"deaths":197,"kd":2.883,"matches":203,"winRate":2.956,"minutesPlayed":2006,"playersOutlived":13023,"lastModified":"2022-08-15T16:56:08Z"},"duo":{"score":54775,"scorePerMin":27.989,"scorePerMatch":300.962,"wins":15,"top5":55,"top12":95,"kills":597,"killsPerMin":0.305,"killsPerMatch":3.28,"deaths":167,"kd":3.575,"matches":182,"winRate":8.242,"minutesPlayed":1957,"playersOutlived":11811,"lastModified":"2022-08-15T14:19:41Z"},"trio":null,"squad":{"score":243090,"scorePerMin":26.911,"scorePerMatch":296.451,"wins":105,"top3":227,"top6":354,"kills":2431,"killsPerMin":0.269,"killsPerMatch":2.965,"deaths":715,"kd":3.4,"matches":820,"winRate":12.805,"minutesPlayed":9033,"playersOutlived":50973,"lastModified":"2022-08-16T17:14:54Z"},"ltm":{"score":87273,"scorePerMin":32.871,"scorePerMatch":258.97,"wins":20,"kills":673,"killsPerMin":0.253,"killsPerMatch":1.997,"deaths":317,"kd":2.123,"matches":337,"winRate":5.935,"minutesPlayed":2655,"playersOutlived":12539,"lastModified":"2022-08-16T16:20:31Z"}},"touch":null}};
        $('.seasonLevel').text(data.battlePass.level);
        $.each(SOLO, function(index, element){
            setElement('solo', element);
        });
        $.each(DUO, function(index, element){
            setElement('duo', element);
        });
        $.each(SQUAD, function(index, element){
            setElement('squad', element);
        });
      stopload();

    function setElement(mode, element) {
        if (element === 'minutesPlayed') {
            const hour = Math.floor(data.stats.all[mode][element] / 60);
            const minutes = Math.floor(data.stats.all[mode][element] % 60);
            let value = (hour > 0) ? hour + "h " : "";
            value += minutes + "min";
            $('#' + mode).find('.' + element).text(value);
        } else {
            $('#' + mode).find('.' + element).text(data.stats.all[mode][element]);
        }
    }
  function stopload(){
    $('#wrap').css('display','block');
    $('#loading').delay(500).fadeOut(500);
    $('#spinner').delay(300).fadeOut(300);
  }
});
