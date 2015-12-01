jQuery(document).ready(function ($) {

    var electreProxyUrl = "http://127.0.0.1/";

    var icon_plus = 'icon_expand_plus.gif';
    var icon_minus = 'icon_expand_moins.gif';

    function fetchBackCover(isbn) {
        fetch(electreProxyUrl + "quatrieme", {isbn: isbn}, function (data) {
            displayBackCover(data);
        });
    }

    function fetchTableOfContent(isbn) {
       fetch(electreProxyUrl + "tabledesmatieres", {isbn: isbn}, function (data) {
            displayTableOfContent(data);
        });
    }

    function fetch(url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            xhr: function () {
                var xhr = jQuery.ajaxSettings.xhr();
                var setRequestHeader = xhr.setRequestHeader;
                xhr.setRequestHeader = function (name, value) {
                    if (name == 'X-Requested-With') return;
                    setRequestHeader.call(this, name, value);
                }
                return xhr;
            },

            success: function (data, textStatus, jqXHR) {
                callback(data);
            }
        });
    }

    function displayBackCover(html) {
        if (html == "") return;
        $("#notice_back_cover").show();
        $("#quatrieme").hide();
        $("#notice_back_cover_content").html(html);
    }

    function displayTableOfContent(html) {
        if (html == "") return;
        $("#notice_table_content").show();
        $("#matiere").hide();
        $("#notice_tablecontent_content").html(html);
    }

    function backCoverExpander() {
        $("#back_cover_expander").click(function (e) {
            e.preventDefault();
            if ($("#quatrieme").css("display") == "none") {
                $("#expand-titre-quatrieme").attr('src', icon_minus);
                $("#quatrieme").show();
            } else {
                $("#expand-titre-quatrieme").attr('src', icon_plus);
                $("#quatrieme").hide();
            }
        })
    }

    function tableOfContentExpander() {
        $("#table_of_content_expander").click(function (e) {
            e.preventDefault();
            if ($("#matiere").css("display") == "none") {
                $("#expand-titre-matiere").attr('src', icon_minus);
                $("#matiere").show();
            } else {
                $("#expand-titre-matiere").attr('src', icon_plus);
                $("#matiere").hide();
            }
        })
    }

    function loadHTML() {
        $(".bottom-fiche-produit").prepend(
            '<div id="notice_table_content" class="notice_div" style="display: none;"> \
                <p class="titre"></p> \
                <a id="notice_table_content_ancre" name="notice_table_content_ancre"></a> \
                <a href="#" id="table_of_content_expander" style="text-decoration:none;">\
                <span class="notice_title">Table des matières</span> \
                <img class="expand-titre notice_title" id="expand-titre-matiere" src="icon_expand_plus.gif"/></a> \
                <div id="matiere"> \
                    <hr />\
                    <br />\
                    <div id="notice_tablecontent_content"> \
                    </div> \
                </div> \
            </div> \
            <div id="notice_back_cover" class="notice_div" style="display: none;"> \
                <p class="titre"></p> \
                <a id="notice_back_cover_ancre" name="notice_back_cover_ancre"></a> \
                <a href="#" id="back_cover_expander" style="text-decoration:none;"> \
                <span class="notice_title">Quatrième de couverture</span> \
                <img class="expand-titre notice_title" id="expand-titre-quatrieme" src="icon_expand_plus.gif"/></a> \
                <div id="quatrieme"> \
                    <hr />\
                    <div id="notice_back_cover_content"> \
                    </div> \
                </div> \
            </div>'
        );
    }

    function load() {
        //we are not on the right page
        if ($('.notice_desc_value[property="dc:identifier"]').length == 0) return;

        var isbn = $('.notice_desc_value[property="dc:identifier"]').html();
        loadHTML();
        fetchBackCover(isbn);
        fetchTableOfContent(isbn);
        backCoverExpander();
        tableOfContentExpander();
    }

    load();
});