import axios from 'axios';
export const SERVER_URL = 'http://localhost:7000';

export const GET_HERO_SECTION_DATA = `${SERVER_URL}/get-hero-section-data`;

export const GET_ABOUT_SECTION_DATA = `${SERVER_URL}/get-about-section-data`;

export const GET_SERVICE_SECTION_DATA = `${SERVER_URL}/get-service-section-data`;

export const GET_PROJECT_SECTION_DATA = `${SERVER_URL}/get-project-section-data`;

export const GET_CLIENT_SECTION_DATA = `${SERVER_URL}/get-client-section-data`;

export const GET_CONTACT_SECTION_DATA = `${SERVER_URL}/get-contact-section-data`;


// ------------------Getting Data-----------------------
export const GetHeroSectionData = async () => {
    const response = await axios.get(GET_HERO_SECTION_DATA);
    return response.data.data;
}
export const GetAboutSectionData = async () => {
    const response = await axios.get(GET_ABOUT_SECTION_DATA);
    return response.data.data;
}
export const GetServiceSectionData = async () => {
    const response = await axios.get(GET_SERVICE_SECTION_DATA);
    return response.data.data;
}
export const GetProjectSectionData = async () => {
    const response = await axios.get(GET_PROJECT_SECTION_DATA);
    return response.data.data;
}
export const GetClientSectionData = async () => {
    const response = await axios.get(GET_CLIENT_SECTION_DATA);
    return response.data.data;
}
export const GetContactSectionData = async () => {
    const response = await axios.get(GET_CONTACT_SECTION_DATA);
    return response.data.data;
}