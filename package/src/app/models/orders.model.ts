export interface Orders {

  id?: number;

  supplierId: number;

  vehicleId: number;

  Cantidad: number;

  FechaDeOrden: Date;

  Estado: string;

  CantidadRecibida: number;

  validación: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}
