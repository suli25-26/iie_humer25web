import { Component } from '@angular/core';
import { PositionService } from '../shared/position.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-position',
  imports: [ReactiveFormsModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css',
})
export class PositionComponent {
  positions!: any;
  positionForm: any;
  showModal = false;
  addMode = true;

  constructor(
    private api: PositionService,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.getPositions();
    this.initForm();
  }

  initForm() {
    this.positionForm = this.builder.group({
      id: [''],
      name: ['']
    })
  }

  getPositions() {
    this.api.getPositions().subscribe({
      next: (res: any) => {
        console.log(res);
        this.positions = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startShowModal() {
    console.log('Hozzáadás...')
    this.showModal = true;
  }

  cancel() {
    this.showModal = false;
    this.addMode = true;
    this.positionForm.reset();
  }

  startSave() {
    console.log('Mentés...')
    this.showModal = false;
    if(this.addMode) {
      this.startAddPosition()
    }else {
      this.startUpdatePosition()
    }
  }

  startAddPosition() {
    console.log(this.positionForm.value)
    const newPostion = {
      name: this.positionForm.value.name
    }
    this.api.createPositon(newPostion).subscribe({
      next: (res) => {
        console.log(res)
        this.positionForm.reset();
        this.getPositions();
      }
    });
  }
  startUpdatePosition() {
    this.api.updatePositon(this.positionForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.getPositions();
      }
    });
  }

  startEdit(position: any) {
    this.addMode = false;
    this.positionForm.patchValue(position)
    this.showModal = true;
  }

  deletePosition(id: number) {
    this.api.deletePositon(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getPositions();
      }
    });
  }
}
