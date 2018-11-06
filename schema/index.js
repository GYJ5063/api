const { gql } = require ('apollo-server');

const typeDefs = gql`
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
        address: CompanyAddress!
    }
 
    type Query {
        profile: User
        restrictedEndPoint: String!
        leads(id: ID!): [Lead]
    }
   
     type Lead {
        id: Int!
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        sales_valuation: Int!
        rental_valuation: Int!
        company: Company,    
        createdAt: String!,
        updatedAt: String!        
    }
    
    type Report {
        predict_results: PredictResults ,
        regional_price_5y: [String],
        local_property_type_statistic:[String],
        comparable_properties:[String],
        sales_history_analyze:[String],
        regional_housetype_price_5y:[String],
        predict_price_5y:[String]
    }
    
    type PredictResults {
      	predict_price: Int,
		probability: Int,
		exist_in_epc: Int,
		predict_price_low: Int,
		band: Int,
		predict_price_up: Int,
		lat: Float,
		lng: Float,
		confidence_level: Int
    }

    type Mutation {
        login(email: String!, password: String!): String!
        getValuation(postcode: String!, building_number: String!, building_name: String!, built_from: String!, property_type: String!, wall_type: String!, number_habitable_rooms: Int!, total_floor_area: Int!,): [Report]!
        createUser(email: String!, first_name: String!, last_name: String!, password: String!,
                   company_name: String, company_telephone: String, company_postcode: String, company_town: String, company_building_number: String): User!
        createCompany(name: String!, telephone: String!, postcode: String!, town: String!, building_number: Int!): Company!
    }
    

    
     
`;

module.exports = typeDefs;