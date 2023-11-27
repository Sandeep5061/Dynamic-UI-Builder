package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "template2")
public class Template1 {
    @Id
    private String templateid;
    private String commonTemplateName; // Added this line
    private List<UserData> data;

    public Template1() {
        // Default constructor
    }

    public Template1(String templateid, String commonTemplateName, List<UserData> data) {
        this.templateid = templateid;
        this.commonTemplateName = commonTemplateName;
        this.data = data;
    }

    public String getTemplateid() {
        return templateid;
    }

    public void setTemplateid(String templateid) {
        this.templateid = templateid;
    }

    public String getCommonTemplateName() {
        return commonTemplateName;
    }

    public void setCommonTemplateName(String commonTemplateName) {
        this.commonTemplateName = commonTemplateName;
    }

    public List<UserData> getData() {
        return data;
    }

    public void setData(List<UserData> data) {
        this.data = data;
    }

    public static class UserData {
        private String id;
        private String label;
        private String value;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }
}

//package com.example.demo.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import java.util.List;
//
//@Document(collection = "template2")
//public class Template1 {
//    @Id
//    private String templateid;
//    private List<UserData> data;
//
//    public Template1() {
//        // Default constructor
//    }
//
//    public Template1(String templateid, List<UserData> data) {
//        this.templateid = templateid;
//        this.data = data;
//    }
//
//    public String getTemplateid() {
//        return templateid;
//    }
//
//    public void setTemplateid(String templateid) {
//        this.templateid = templateid;
//    }
//
//    public List<UserData> getData() {
//        return data;
//    }
//
//    public void setData(List<UserData> data) {
//        this.data = data;
//    }
//
//    public static class UserData {
//        private String id;
//        private String label;
//        private String value;
//
//        public String getId() {
//            return id;
//        }
//
//        public void setId(String id) {
//            this.id = id;
//        }
//
//        public String getLabel() {
//            return label;
//        }
//
//        public void setLabel(String label) {
//            this.label = label;
//        }
//
//        public String getValue() {
//            return value;
//        }
//
//        public void setValue(String value) {
//            this.value = value;
//        }
//    }
//}
