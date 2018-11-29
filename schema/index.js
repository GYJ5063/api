const { gql } = require ('apollo-server');
const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql`
    scalar JSON

    type User {
        id: Int!
        first_name: String!
        last_name: String!
        company: Company
        email: String!
    }
    type CompanyAddress {
        id: Int!
        company_id: Int!
        postcode: String!
        town: String!
        building_number: String!
    }
    type Company {
        id: Int!
        name: String!
        telephone: String!
        logo: String!
        primary_colour: String!
        secondary_colour: String
        website_url: String!
        valuation_url: String!
        page_title: String!
        meta_description: String!
        address: CompanyAddress!
    }
 
    type Query {
        profile: User
        leads: [Lead],
        company: Company
        addresses(postcode: String!) : [Address],
        report(id: ID!) : Report
    }
   
     type Lead {
        id: Int!
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        sales_valuation: Int!
        rental_valuation: Int!
        company_id: Int!
        report_id: ID!
        createdAt: String!,
        updatedAt: String!
    }
    
    type SellingResults {
        predict_results: JSON,
        sales_history_analyze: JSON,
        query_info: JSON,
        local_property_type_statistic: JSON,
        national_avg_price_10y: JSON,
        comparable_properties: JSON,
        regional_price_10y: JSON,
        regional_housetype_price_10y: JSON
        predict_price_10y: JSON
    }

    type RentalResults {
        rental_comparable_properties: JSON,
        rental_predict_price: JSON
    }

    type Report {
        id: ID,
        company: Company,
        address: Address,
        selling_results: SellingResults,
        rental_results: RentalResults
    }

    type PredictResults {
      	predict_price: Int,
		probability: Float,
		exist_in_epc: Int,
		predict_price_low: Int,
		band: Float,
		predict_price_up: Int,
		lat: Float,
		lng: Float,
		confidence_level: Int
    }

    type Address {
        id: Int!
        postcode: String!
        town: String!
        dependent_locality: String
        double_dependent_locality: String
        thoroughfare: String
        dependent_thoroughfare: String
        building_number: Int
        building_name: String
        sub_building_name: String
        po_box: String
        department_name: String
        organisation_name: String
        postcode_type: String
        su_organisation_indicator: String
        delivery_point_suffix: String
        lat: Float
        lng: Float
        udprn: Int
    }

    type Mutation {
        login(email: String!, password: String!): String!
        forgotPassword(email: String!): String!
        getValuation(postcode: String!, building_number: String!, building_name: String!, built_from: String!, property_type: String!, wall_type: String!, number_habitable_rooms: Int!, total_floor_area: Int!,): Report!
        createUser(email: String!, first_name: String!, last_name: String!, password: String!,
                   company_name: String, company_telephone: String, company_postcode: String, company_town: String, company_building_number: String): User!
        createCompany(name: String!, telephone: String!, postcode: String!, town: String!, building_number: Int!): Company!
        createLead(first_name: String!, last_name: String!, email: String!, phone_number: String!, sales_valuation: Float!, rental_valuation: Float!, company_id: Int!, report_id: ID): Lead!
        verifyToken(token: String!): Boolean!
        resetPassword(token: String!, password: String!, confirmPassword: String!): String!
        saveReport(report: JSON!, company_id: Int!) : ID
    }
`;

module.exports = typeDefs;