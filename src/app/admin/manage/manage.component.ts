import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  reservatinList: [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.getAllReservations();
  }

  async getAllReservations() {
    this.reservationService.getAllReservations().subscribe((data: any) => {
      this.reservatinList = data.data;
      console.log(this.reservatinList);
    });
  }

  async deleteReservation(id: string) {
    Swal.fire({
      title: 'ยืนยันหรือไม่?',
      text: 'ท่านยืนยันการลบข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        this.reservationService.deleteReservation(id).subscribe((data: any) => {
          Swal.fire(
            'ลบข้อมูลแล้ว!',
            'ท่านได้ทำการลบข้อมูลเรียบร้อยแล้ว',
            'success'
          );
          this.getAllReservations();
        });
      } 
    });
  }
}
