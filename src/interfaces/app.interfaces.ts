

export interface IMove {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
    name:string
    original_name:string
  }

  export interface Element {
    type :"Trailer"|'Clip'|"Opening Credits";
  }
  
  export interface Product {
    default_price: {
      id :string;
      unit_amount:number
    }
    id:string;
    images:string[];
    metadata:{
      adv:string;
    }
    name:string;
  }

  export interface Subscription {

    default_payment_method: {
      card: {
        brand: string;
        exp_month: number;
        exp_year: number;
        last4: number;
      };
    }
    current_period_start: number;
    id: string;
    current_period_end: number;
    plan: {
      amount: true;
      active: boolean;
      nickname: string;
    };
    
    customer: {
      email: string;
      invoice_settings:{
        default_payment_method: {
          card: {
            brand: string;
            exp_month: number;
            exp_year: number;
            last4: number;
          };
        };
      }
      metadata:{
        user_id:string

      }
    };
  }

  export interface MyList {
    userId:string;
    product:IMove,
  }