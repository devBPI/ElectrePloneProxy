jQuery( document ).ready(function( $ ) {
    
    var electreProxyUrl = "http://127.0.0.1:5000/";

    var icon_plus = 'icon_expand_plus.gif';
    var icon_minus = 'icon_expand_moins.gif';

    function fetchBackCover(isbn) {
        $.get(electreProxyUrl + "quatrieme", {isbn: isbn}, function( data ) {
             displayBackCover(data);
        });
    }

    function fetchTableOfContent(isbn) {
        $.get(electreProxyUrl + "tabledesmatieres", {isbn: isbn}, function( data ) {
             displayTableOfContent(data);
        });
    }

    function displayBackCover(html) {
        $("#notice_back_cover").show();
        $("#quatrieme").hide();
        $("#notice_back_cover_content").html(html);
    }

    function displayTableOfContent(html) {
        $("#notice_table_content").show();
        $("#matiere").hide();
        $("#notice_tablecontent_content").html(html);
    }

    function backCoverExpander() {
        $("#back_cover_expander").click(function(e){
            e.preventDefault();
            if($("#quatrieme").css("display") == "none") {
                $("#expand-titre-quatrieme").attr('src', icon_minus);
                $("#quatrieme").show();
            } else {
                $("#expand-titre-quatrieme").attr('src', icon_plus);
                $("#quatrieme").hide();
            }
        })
    }

    function tableOfContentExpander() {
        $("#table_of_content_expander").click(function(e){
            e.preventDefault();
            if($("#matiere").css("display") == "none") {
                $("#expand-titre-matiere").attr('src', icon_minus);
                $("#matiere").show();
            } else {
                $("#expand-titre-matiere").attr('src', icon_plus);
                $("#matiere").hide();
            }
        })
    }

    function load() {
        var isbn = $('.notice_desc_value[property="dc:identifier"]').html();
        fetchBackCover(isbn);
        fetchTableOfContent(isbn);
        backCoverExpander();
        tableOfContentExpander();
    }

    load();
});