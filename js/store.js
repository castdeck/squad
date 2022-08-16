$(function () {

  var h = $(window).height();
  $('#loading ,#spinner').height(h).css('display','block');

  var RARITY = {
    "uncommon": "light text-dark",
    "common": "success",
    "rare": "primary",
    "epic": "secondary",
    "legend": "warning"
  };

  $(function () {
    $.ajax({
      url: "https://fortnite-api.com/v2/shop/br?language=ja",
      type: "GET",
      dataType: "json",
    }).done(function (shopData) {
      $('#featured-list').append(createEntryCard(shopData.data.featured.entries, "featured"));
      $('#daily-list').append(createEntryCard(shopData.data.daily.entries, "daily"));
      $('#specialFeatured-list').append(createEntryCard(shopData.data.specialFeatured.entries, "specialFeatured"));

      $('#updated_at').html(luxon.DateTime.fromISO(shopData.data.date).toFormat('yyyy/MM/dd HH:mm'));

      $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var type = button.data('type');
        var entryIndex = button.data('entry-index');
        var modal = $(this);
        var items;
        if (type === "featured") {
          items = createItemCard(shopData.data.featured.entries[entryIndex]);
        } else if (type === "daily") {
          items = createItemCard(shopData.data.daily.entries[entryIndex]);
        } else {
          items = createItemCard(shopData.data.specialFeatured.entries[entryIndex]);
        }
        $('#item-list').html(items);

        return;
      });

      stopload();
    }).fail(function (data) {
      // error
      console.log("error");
    });
  });

  function createEntryCard(entries, featuredType) {
    return entries.map(function (entry, index) {
      let cards = '<div class="col-sm-3 pb-3 ">';
      cards += '<a href="javascript:void(0);" data-mdb-toggle="modal" data-mdb-target="#exampleModal" data-type="' + featuredType + '"featured" data-entry-Index="' + index + '" >'
      cards += '<img class="card-img-top shadow-1-strong" src="' + entry.newDisplayAsset.materialInstances[0].images.Background + '">';
      cards += '</a>';
      cards += '<div class="card-body shadow-1-strong">';
      cards += '<span class="card-text">' + entry.finalPrice + '<img src="https://fortnite-api.com/images/vbuck.png" style="width:19px; vertical-align: -4px"></span>';
      if (entry.banner) {
        cards += '<br><p class="card-text badge rounded-pill bg-danger" style="white-space: normal;">' + entry.banner.value + '</p>';
      }
      cards += "</div>";
      cards += "</div>";
      return cards;
    }).join('');
  }

  function createItemCard(entry) {
    $('#exampleModalLabel').html(entry.finalPrice + '<img src="https://fortnite-api.com/images/vbuck.png" style="width:20px; vertical-align: -3px">');
    let items = entry.items;
    let bgColor1 = entry.newDisplayAsset.materialInstances[0].colors.Background_Color_A;
    let bgColor2 = entry.newDisplayAsset.materialInstances[0].colors.Background_Color_B;
    return items.map(function (item) {
      let cards = '<div class="col-sm-3 pb-3 card ">';
      cards += '<img class="card-img-top" src="';
      cards += item.images.icon;
      cards += '" style="background:-webkit-gradient(linear, left top, left bottom, from(#' + bgColor1 + '), to(#' + bgColor2 + '));">';
      let rarity = RARITY[item.rarity.value];
      rarityStyle = rarity ? rarity : "dark";
      cards += '<div class="card-body shadow-1-strong border-top border-' + rarityStyle + ' border-5">';
      cards += '<h5 class="card-title me-3">' + item.name + '</h5>';
      cards += '<div class="card-text"><p class="border badge rounded-pill bg-' + rarityStyle + ' " style="white-space: normal;">' + item.type.displayValue + '</p>' + '</div>';
      if (item.variants) {
        cards += '<div class="row">';
        item.variants[0].options.map(function (option) {
          cards += '<img class="col-sm-6 border" src="' + option.image + '" style="background:-webkit-gradient(linear, left top, left bottom, from(#' + bgColor1 + '), to(#' + bgColor2 + '));">';
        });
        cards += '</div>'
      }
      cards += "</div>";
      cards += "</div>";
      return cards;
    }).join('');
  }

  function stopload(){
    $('#wrap').css('display','block');
    $('#loading').delay(500).fadeOut(500);
    $('#spinner').delay(300).fadeOut(300);
  }
});
