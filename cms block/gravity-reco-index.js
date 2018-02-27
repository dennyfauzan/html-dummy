<div class="">
    <div class="container candy-wrapper">
        <div id="reco_callback_target">&nbsp;</div>
    </div>
</div>
<script type="text/javascript">
$(document).ready(function(){
    pushGravity({
        type: "recommendation",
        callback: callback_widget_reco,
        numberLimit: 10,
        scenarioId: "MAIN_PAGE",
        resultNames: ["name", "itemId", "price","image-url","product-url"]
    });
    function callback_widget_reco(result){

        if(result.items.length > 0) {
            var div = document.getElementById("reco_callback_target");
            div.setAttribute('class', 'recItems list-prod-area-vertical');
            var recotitle = document.createElement("div");
            recotitle.setAttribute('class', 'tag-title padside5 push _bottom _x2');
            div.appendChild(recotitle);
            var h3title = document.createElement("h3");
            h3title.setAttribute('class', 'title _h3');
            recotitle.appendChild(h3title);
            h3title.appendChild(document.createTextNode("Produk Populer"));
            var wraplist = document.createElement("div");
            wraplist.setAttribute('class', 'list-prod-area-vertical');
            div.appendChild(wraplist);
            var found = 0;

            for (var i = 0; i < result.items.length; ++i) {
                var item = result.items[i];
                var thumb_url = item["image-url"];

                if (!thumb_url) { continue; }

                if (found > 4) { break; }
                
                found += 1;

                var itemDiv = document.createElement("div");
                itemDiv.setAttribute('class', 'recItem prod-widget-vertical');
                wraplist.appendChild(itemDiv);

                var wrap_image = document.createElement("div");
                wrap_image.setAttribute('class','prod-image');
                itemDiv.appendChild(wrap_image);
                var img = document.createElement("img");
                thumb_url = thumb_url.replace(/^http:\/\//i, 'https://');
                img.setAttribute('src', thumb_url);
                wrap_image.appendChild(img);
                
                var wrap_button = document.createElement("a");
                wrap_button.setAttribute('class','wrap-widget-button');
                var prodlink = item["product-url"];
                wrap_button.setAttribute('href', prodlink);
                wrap_image.appendChild(wrap_button);
                var imgLink = document.createElement("span");
                imgLink.setAttribute('class','block-link-product config-prod btn btn-ghost btn-block');
                imgLink.appendChild(document.createTextNode("Lihat Detil"));
                wrap_button.onmousedown =  (function (itemId) {
                    return function () {
                        _gravity.push({type:'event', eventType:'REC_CLICK', itemId: itemId});
                    };
                })(item.itemId);
                wrap_button.appendChild(imgLink);

                var widget_detail = document.createElement("div");
                widget_detail.setAttribute('class','wrap-widget-detail');
                itemDiv.appendChild(widget_detail);

                var titleLink = document.createElement("a");
                titleLink.setAttribute('href', prodlink);
                titleLink.onmousedown =  (function (itemId) {
                    return function () {
                        _gravity.push({type:'event', eventType:'REC_CLICK', itemId:  itemId});
                    };
                })(item.itemId);
                var textDivtitle = document.createElement("div");
                textDivtitle.setAttribute('class', 'prod-name');
                textDivtitle.appendChild(titleLink);
                titleLink.appendChild(document.createTextNode(item.name));
                widget_detail.appendChild(textDivtitle);

                var textDivprice = document.createElement("div");
                var price = Math.round(item.price);
                var price_id =numberWithCommas(price);
                textDivprice.setAttribute('class', 'widget-price');
                textDivprice.appendChild(document.createTextNode("Rp " + price_id));
                widget_detail.appendChild(textDivprice);
            }
         }
    }
});
</script>