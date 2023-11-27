package com.example.demo.model;

import org.springframework.data.annotation.Id;
import java.util.List;

public class DemoData {

    @Id
    private String uniqueId; // Changed to uniqueId

    private String templateName;
    private List<Property> properties;

    public DemoData() {
    }

    public DemoData(String uniqueId, String templateName, List<Property> properties) {
        this.uniqueId = uniqueId;
        this.templateName = templateName;
        this.properties = properties;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public List<Property> getProperties() {
        return properties;
    }

    public void setProperties(List<Property> properties) {
        this.properties = properties;
    }

    public static class Property {
        private String id;
        private String type;
        private String label;

        private String text; // Added property

        private String inputType;

        private boolean isRequired;
        private boolean isMultiple;
        private int maxLength;
        private boolean disabled;

        private List<String> options;

        public Property() {
        }

        public Property(String id, String type, String label, List<String> options, boolean disabled, String text, boolean isMultiple, int maxLength, boolean isRequired, String inputType) {
            this.id = id;
            this.type = type;
            this.label = label;
            this.options = options;
            this.disabled = disabled;
            this.text = text;
            this.maxLength=maxLength;
            this.inputType=inputType;
            this.isRequired=isRequired;
            this.isMultiple=isMultiple;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public boolean isDisabled() {
            return disabled;
        }

        public void setDisabled(boolean disabled) {
            this.disabled = disabled;
        }
        public boolean isMultiple() {
            return isMultiple;
        }

        // Setter for isRequired
        public void setIsMultiple(boolean isMultiple) {
            this.isMultiple= isMultiple;
        }
        public List<String> getOptions() {
            return options;
        }

        public void setOptions(List<String> options) {
            this.options = options;
        }
        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
        // Getter for inputType
        public String getInputType() {
            return inputType;
        }

        // Setter for inputType
        public void setInputType(String inputType) {
            this.inputType = inputType;
        }

        // Getter for isRequired
        public boolean getIsRequired() {
            return isRequired;
        }

        // Setter for isRequired
        public void setIsRequired(boolean isRequired) {
            this.isRequired = isRequired;
        }

        // Getter for maxLength
        public int getMaxLength() {
            return maxLength;
        }

        // Setter for maxLength
        public void setMaxLength(int maxLength) {
            this.maxLength = maxLength;
        }
    }
}


//package com.example.demo.model;
//
//import java.util.List;
//import org.springframework.data.annotation.Id;
//
//public class DemoData {
//
//
//    private String templateName;
//    private List<Property> properties;
//
//    public DemoData() {
//    }
//
//    public DemoData(String templateName, List<Property> properties) {
//        this.templateName = templateName;
//        this.properties = properties;
//    }
//
//    public String getTemplateName() {
//        return templateName;
//    }
//
//    public void setTemplateName(String templateName) {
//        this.templateName = templateName;
//    }
//
//    public List<Property> getProperties() {
//        return properties;
//    }
//
//    public void setProperties(List<Property> properties) {
//        this.properties = properties;
//    }
//
//    public static class Property {
//        private String id;
//        private String type;
//        private String label;
//
//        private boolean disabled;
//        private List<String> options;
//
//        public Property() {
//        }
//
//        public Property(String id, String type, String label, List<String> options, boolean disabled) {
//            this.id = id;
//            this.type = type;
//            this.label = label;
//            this.options = options;
//            this.disabled = disabled;
//        }
//
//        public boolean isDisabled() {
//            return disabled;
//        }
//
//        public void setDisabled(boolean disabled) {
//            this.disabled = disabled;
//        }
//        public String getId() {
//            return id;
//        }
//
//        public void setId(String id) {
//            this.id = id;
//        }
//
//        public String getType() {
//            return type;
//        }
//
//        public void setType(String type) {
//            this.type = type;
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
//        public List<String> getOptions() {
//            return options;
//        }
//
//        public void setOptions(List<String> options) {
//            this.options = options;
//        }
//    }
//}
