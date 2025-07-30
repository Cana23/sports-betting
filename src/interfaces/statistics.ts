import { Models } from "./models";

export interface Statistics {
    accuracy: number;
    model_used: Models.LinearRegression;
    predicted: number;
    real: number;
}