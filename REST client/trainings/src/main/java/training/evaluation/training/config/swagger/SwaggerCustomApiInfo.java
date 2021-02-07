package training.evaluation.training.config.swagger;

import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;

public class SwaggerCustomApiInfo {

    private static String TITLE = "Training evaluation platform REST API";
    private static String DESCRIPTION = "Training evaluation platform description of API";
    private static String API_VERSION = "API Version";
    private static String TERMS_OF_SERVICES_URL = "Terms of services URL";
    private static String CONTACT_NAME = "Sofija Petroska, Goran Petrovski";
    private static String CONTACT_URL = "Contact URL";
    private static String CONTACT_EMAIL = "sofija.petroska@musala.com, goran.petrovski@musala.com";
    private static String LICENSE = "License";
    private static String LICENSE_URL = "License URL";

    private static Contact CONTACT = new Contact(CONTACT_NAME, CONTACT_URL, CONTACT_EMAIL);

    public static ApiInfo apiInfo() {
        return new ApiInfo(TITLE, DESCRIPTION, API_VERSION, TERMS_OF_SERVICES_URL, CONTACT, LICENSE, LICENSE_URL);
    }

}
