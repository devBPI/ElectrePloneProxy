import xml.etree.ElementTree as ET


class BackCoverTransformator:
    def __init__(self, xml):
        self.xml = xml

    def to_html(self):
        return self.get_html("presentation") + self.get_html("biographie")

    def get_html(self, element):
        content = self.get_children_as_text(self.xml.find(element))
        if content == "":
            return ""
        else:
            return "<p>" + content + "</p>"

    def get_children_as_text(self, element):
        if element == None:
            return ""
        else:
            return "".join(ET.tostring(e) for e in list(element))