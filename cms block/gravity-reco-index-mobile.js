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
        if(result.items.length > 0){
            var div = document.getElementById("reco_callback_target");
            div.setAttribute('class', 'recItems list-prod-area-horizontal');
            var wraprecotitle = document.createElement("div");
            var recotitle = document.createElement("h3");
            wraprecotitle.setAttribute('class', 'tag-title push _bottom padside5');
            recotitle.setAttribute('class', 'title _h3');
            wraprecotitle.appendChild(recotitle);
            recotitle.appendChild(document.createTextNode("Produk Populer"));
            div.appendChild(wraprecotitle);
            var found = 0;

            for (var i = 0; i < result.items.length; ++i) {
                var item = result.items[i];
                var thumb_url = item["image-url"];

                if (!thumb_url) { continue; }

                if (found > 4) { break; }
                
                found += 1;

                var itemDiv = document.createElement("div");
                itemDiv.setAttribute('class', 'recItem prod-widget-horizontal');
                div.appendChild(itemDiv);

                
                var wrap_image = document.createElement("div");
                wrap_image.setAttribute('class','prod-image');
                itemDiv.appendChild(wrap_image);
                var imgLink = document.createElement("a");
                imgLink.setAttribute('href', item['product-url']);
                imgLink.onmousedown =  function() {
                    _gravity.push({type:'event', eventType:'REC_CLICK', itemId: item.itemId});
                };
                var img = document.createElement("img");
                wrap_image.appendChild(imgLink);
                thumb_url = thumb_url.replace(/^http:\/\//i, 'https://');
                img.setAttribute('src', thumb_url);
                imgLink.appendChild(img);

                var widget_detail = document.createElement("div");
                widget_detail.setAttribute('class','wrap-right-area');
                itemDiv.appendChild(widget_detail);
                
                var titleLink = document.createElement("a");
                titleLink.setAttribute('href', item['product-url']);
                titleLink.onmousedown =  function() {
                    _gravity.push({type:'event', eventType:'REC_CLICK', itemId: item.itemId});
                };
                var textDivtitle = document.createElement("div");
                textDivtitle.setAttribute('class', 'prod-name');
                textDivtitle.appendChild(titleLink);
                titleLink.appendChild(document.createTextNode(item.name));
                widget_detail.appendChild(textDivtitle);

                var wrap_textDivprice = document.createElement("div");
                wrap_textDivprice.setAttribute('class', 'widget-price');
                var textDivprice = document.createElement("p");
                textDivprice.setAttribute('class', 'price');
                wrap_textDivprice.appendChild(textDivprice);
                var price = Math.round(item.price);
                var price_id =numberWithCommas(price);
                textDivprice.appendChild(document.createTextNode("Rp " + price_id));
                widget_detail.appendChild(wrap_textDivprice);
            }
        }
    }
});
</script>
<style>
    .list-prod-area-horizontal .prod-widget-horizontal:nth-child(2) {
        border-top: 1px solid #e7e7e7;
    }
</style>