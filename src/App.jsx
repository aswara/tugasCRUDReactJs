import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    //buat state
    this.state = {
      datas: [], //untuk menyimpan data yang di kirim buat array kosong
      aksi: 0,
      index: 0
    }
  }

  kirimData(e) {
    let nama = this.refs.nama.value //mengambil nilai dari yang di input dari referensi nama
    let alamat = this.refs.alamat.value ////mengambil nilai dari yang di input dari referensi alamat
    let datas = this.state.datas //ambil state dari data yang isinya akan terus berubah ketika di tambah
    

    // jika key dan value nya sama bisa pakai shorthand
    // let data = {
    //   nama: nama,
    //   alamat: alamat
    // }

    
    if(this.state.aksi === 0){ //tambah data jika tombol edit belum di klik
        // simpan nama dan alamat ke dalam object variabel data 
        let data = {
          nama, alamat
        }
        datas.push(data); // method push(databaru) untuk menambah isi ke dalam array menjadi isi array yang terakhir 
    
    } else { //ubah data
      let index = this.state.index //ambil indek dari state yang mau di edit
      datas[index].nama = nama; //ambil data yang indeksnya sesuai di ganti inputan baru
      datas[index].alamat = alamat;
    }
    

    this.setState({ //ubah isi state datas yang isinya dari datas yang baru di tambah
      datas: datas,
      aksi: 0,
      index: 0
    })

    //mengembalikan input menjadi kosong lagi
    this.refs.nama.value = ''
    this.refs.alamat.value = '' 
  }

  hapus(i) { //[i] akan mengambil no indeks yang mau kita hapus
    let datas = this.state.datas //buat variabel yang isinya array mengambil dari data yang di state
    datas.splice(i,1) //method splice berfungsi menghapus isi data array dari posisi awal [i] sampai no sampainya 1
    this.setState({ //biar yang di hapus isi array dengan indeksnya [i] saja
      datas
    })

  }

  edit(i) {
    let data = this.state.datas[i] //ambil data angmau di edit dari indeknya i
    this.refs.nama.value = data.nama; //ubah input nama menjadi nilai dari data yang mau di edit 
    this.refs.alamat.value = data.alamat; ////ubah alamat nama menjadi nilai dari data yang mau di edit 
    this.setState({
      index: i, //ubah indek dari state menjadi indek yang di klik
      aksi: 1 //ubah aksi menjadi satu supaya ketika di simpan tidak tambah data tetapi ubah data 
    })
  }

  render() {

    return (
      <div className="container mt-3">
      <div className="row bg-primary text-light mb-3 py-2">
        <div className="col-md-3">
          <img className="img-fluid" src="http://www.pondokit.com/img/pondokit.png" alt=""/>
        </div>
        <div className="col-md-2">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="col-md-7">
          <h1>Tugas Santri Pondok Programmer buat CRUD dengan React JS</h1>
        </div>
      </div>
      <div className="row">
      <div className="col-md-5 text-center">
      {
        (this.state.aksi === 0)?
        <div className="tambah shadow border lg-shadow pb-5 px-5">  
        <from className="form-group">
          <h3 className="text-primary my-4">Tambah Data</h3>
          {/* ref berfungsi memberikan nilai referensi pada element*/}
          <input className="form-control mb-2" type="text" ref="nama" placeholder="Masukan Nama" />
          <input className="form-control mb-2" type="text" ref="alamat" placeholder="Masukan Alamat" />
          {/* berikan event ketika di klik menjalankan arrow function yang mereturn method kirimData tanpa perlu di bind */}
          <button className="btn btn-primary btn-block" onClick={(e)=>this.kirimData(e)}>Tambah</button>
        </from>
      </div>:
        <div className="edit shadow border lg-shadow pb-5 px-5">
        <from className="form-group">
          <h3 className="text-success my-4"><b>Edit Data</b></h3>
          {/* ref berfungsi memberikan nilai referensi pada element*/}
          <input className="form-control mb-2" type="text" ref="nama" placeholder="Masukan Nama" />
          <input className="form-control mb-2" type="text" ref="alamat" placeholder="Masukan Alamat" />
          {/* berikan event ketika di klik menjalankan arrow function yang mereturn method kirimData tanpa perlu di bind */}
          <button className="btn btn-success btn-block" onClick={(e)=>this.kirimData(e)}>Simpan</button>
        </from>
      </div>
      }
      
      </div>
        <div className="col-md-7">
        <table className="table">
              <thead>
                <tr className="bg-primary text-white">
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
          {/* buat pengulangan yang akan menampilkan state datas yang isinya array */
          /*  menggunakan method dari javascript map() ambil nilai dan indeksnya */
            this.state.datas.map((data, i)=>
              <tbody>
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{data.nama}</td>
                  <td>{data.alamat}</td>
                  <td><button className="btn btn-danger mr-2" onClick={()=>this.hapus(i)}>hapus</button>
                  <button className="btn btn-success " onClick={()=>this.edit(i)}>edit</button></td>
                </tr>
              </tbody>
            )            
           }
           </table>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
