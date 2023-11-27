package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "CombDem")
public class CombDemo {
    @Id
    private String id;
    private String commonName;
    private List<Template> templates;

    // Constructors
    public CombDemo() {}

    public CombDemo(String id, String commonName, List<Template> templates) {
        this.id = id;
        this.commonName = commonName;
        this.templates = templates;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public List<Template> getTemplates() {
        return templates;
    }

    public void setTemplates(List<Template> templates) {
        this.templates = templates;
    }

    @Override
    public String toString() {
        return "CombDemo{" +
                "id='" + id + '\'' +
                ", commonName='" + commonName + '\'' +
                ", templates=" + templates +
                '}';
    }

    public static class Template {
        private String id;
        private String templateName;
        private List<Property> properties;

        // Constructors
        public Template() {}

        public Template(String id, String templateName, List<Property> properties) {
            this.id = id;
            this.templateName = templateName;
            this.properties = properties;
        }

        // Getters and Setters
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
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

        @Override
        public String toString() {
            return "Template{" +
                    "id='" + id + '\'' +
                    ", templateName='" + templateName + '\'' +
                    ", properties=" + properties +
                    '}';
        }

        public static class Property {
            private String id;
            private String inputType;
            private Boolean isRequired;
            private String label;
            private String maxLength;
            private String placeholder;
            private String type;
            private Boolean isMultiple;
            private List<String> options;

            // Constructors
            public Property() {}

            public Property(String id, String inputType, Boolean isRequired, String label, String maxLength, String placeholder, String type, Boolean isMultiple, List<String> options) {
                this.id = id;
                this.inputType = inputType;
                this.isRequired = isRequired;
                this.label = label;
                this.maxLength = maxLength;
                this.placeholder = placeholder;
                this.type = type;
                this.isMultiple = isMultiple;
                this.options = options;
            }

            // Getters and Setters
            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
            }

            public String getInputType() {
                return inputType;
            }

            public void setInputType(String inputType) {
                this.inputType = inputType;
            }

            public Boolean getIsRequired() {
                return isRequired;
            }

            public void setIsRequired(Boolean isRequired) {
                this.isRequired = isRequired;
            }

            public String getLabel() {
                return label;
            }

            public void setLabel(String label) {
                this.label = label;
            }

            public String getMaxLength() {
                return maxLength;
            }

            public void setMaxLength(String maxLength) {
                this.maxLength = maxLength;
            }

            public String getPlaceholder() {
                return placeholder;
            }

            public void setPlaceholder(String placeholder) {
                this.placeholder = placeholder;
            }

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public Boolean getIsMultiple() {
                return isMultiple;
            }

            public void setIsMultiple(Boolean isMultiple) {
                this.isMultiple = isMultiple;
            }

            public List<String> getOptions() {
                return options;
            }

            public void setOptions(List<String> options) {
                this.options = options;
            }

            @Override
            public String toString() {
                return "Property{" +
                        "id='" + id + '\'' +
                        ", inputType='" + inputType + '\'' +
                        ", isRequired=" + isRequired +
                        ", label='" + label + '\'' +
                        ", maxLength='" + maxLength + '\'' +
                        ", placeholder='" + placeholder + '\'' +
                        ", type='" + type + '\'' +
                        ", isMultiple=" + isMultiple +
                        ", options=" + options +
                        '}';
            }
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
//@Document(collection = "CombDem")
//public class CombDemo {
//    @Id
//    private String id;
//    private String commonName;
//    private List<Template> templates;
//
//    public static class Template {
//        private String id;
//        private String templateName;
//        private List<Property> properties;
//
//        public static class Property {
//            private String id;
//            private String inputType;
//            private Boolean isRequired;
//            private String label;
//            private String maxLength;
//            private String placeholder;
//            private String type;
//            private Boolean isMultiple;
//            private List<String> options;
//
//            // Constructors (if needed)
//
//            public String getId() {
//                return id;
//            }
//
//            public void setId(String id) {
//                this.id = id;
//            }
//
//            public String getInputType() {
//                return inputType;
//            }
//
//            public void setInputType(String inputType) {
//                this.inputType = inputType;
//            }
//
//            public Boolean getRequired() {
//                return isRequired;
//            }
//
//            public void setRequired(Boolean required) {
//                isRequired = required;
//            }
//
//            public String getLabel() {
//                return label;
//            }
//
//            public void setLabel(String label) {
//                this.label = label;
//            }
//
//            public String getMaxLength() {
//                return maxLength;
//            }
//
//            public void setMaxLength(String maxLength) {
//                this.maxLength = maxLength;
//            }
//
//            public String getPlaceholder() {
//                return placeholder;
//            }
//
//            public void setPlaceholder(String placeholder) {
//                this.placeholder = placeholder;
//            }
//
//            public String getType() {
//                return type;
//            }
//
//            public void setType(String type) {
//                this.type = type;
//            }
//
//            public Boolean getMultiple() {
//                return isMultiple;
//            }
//
//            public void setMultiple(Boolean multiple) {
//                isMultiple = multiple;
//            }
//
//            public List<String> getOptions() {
//                return options;
//            }
//
//            public void setOptions(List<String> options) {
//                this.options = options;
//            }
//
//            @Override
//            public String toString() {
//                return "Property{" +
//                        "id='" + id + '\'' +
//                        ", inputType='" + inputType + '\'' +
//                        ", isRequired=" + isRequired +
//                        ", label='" + label + '\'' +
//                        ", maxLength='" + maxLength + '\'' +
//                        ", placeholder='" + placeholder + '\'' +
//                        ", type='" + type + '\'' +
//                        ", isMultiple=" + isMultiple +
//                        ", options=" + options +
//                        '}';
//            }
//        }
//
//        // Constructors
//
//        // Getters and Setters
//
//        public String getId() {
//            return id;
//        }
//
//        public void setId(String id) {
//            this.id = id;
//        }
//
//        public String getTemplateName() {
//            return templateName;
//        }
//
//        public void setTemplateName(String templateName) {
//            this.templateName = templateName;
//        }
//
//        public List<Property> getProperties() {
//            return properties;
//        }
//
//        public void setProperties(List<Property> properties) {
//            this.properties = properties;
//        }
//
//        @Override
//        public String toString() {
//            return "Template{" +
//                    "id='" + id + '\'' +
//                    ", templateName='" + templateName + '\'' +
//                    ", properties=" + properties +
//                    '}';
//        }
//    }
//
//    // Constructors
//
//    // Getters and Setters
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getCommonName() {
//        return commonName;
//    }
//
//    public void setCommonName(String commonName) {
//        this.commonName = commonName;
//    }
//
//    public List<Template> getTemplates() {
//        return templates;
//    }
//
//    public void setTemplates(List<Template> templates) {
//        this.templates = templates;
//    }
//
//    @Override
//    public String toString() {
//        return "Data{" +
//                "id='" + id + '\'' +
//                ", commonName='" + commonName + '\'' +
//                ", templates=" + templates +
//                '}';
//    }
//}
