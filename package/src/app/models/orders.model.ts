export interface Orders {

  id?: number;

  vehicleId: number;

  Cantidad: number;

  FechaDeOrden: Date;

  Estado: string;

  CantidadRecibida: number;

  validación: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
