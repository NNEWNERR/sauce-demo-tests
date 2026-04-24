export type SauceUser =
  | 'standard_user'
  | 'locked_out_user'
  | 'problem_user'
  | 'performance_glitch_user'
  | 'error_user'
  | 'visual_user'

export const SAUCE_PASSWORD = 'secret_sauce'

export interface Product {
  id:          string
  name:        string
  description: string
  price:       number
}

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo'

export interface CheckoutInfo {
  firstName: string
  lastName:  string
  zipCode:   string
}