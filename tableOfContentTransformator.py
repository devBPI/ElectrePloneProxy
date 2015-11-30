class TableOfContentTransformator:

    def __init__(self, xml):
        self.xml = xml

    def to_html(self):
        html = self.split_by_level(
            filter(lambda xml: xml.tag == "tocitem",
                   list(self.xml)), 0)

        if html == "":
            return ""
        else:
            return '<ol style="list-style-type:none">' + html + '</ol>'

    def split_by_level(self, xml_array, level, acc = ''):
        if(len(xml_array) == 0 or level < 0): return acc
        head, tail = xml_array[0], xml_array[1:]
        current_level = int(head.find("item").get("level"))
        if(current_level == level):
            return self.split_by_level(tail, level, acc + self.html_title(head, current_level))
        if(current_level < level):
            return self.split_by_level(xml_array, level - 1, acc + "</ol>")
        if(current_level > level):
            return self.split_by_level(xml_array, level + 1, acc + "<ol>")

    def html_title(self, item, level):
        title = item.findtext("item")
        page = item.findtext("page")
        if(page == ""):
            content = title
        else:
            content = title + " (<em>page " + page + "</em>)"
        return "<li>" + content + "</li>"