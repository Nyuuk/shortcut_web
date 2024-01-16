<!doctype html>
<html lang="en">

<head>
    <title>Form Input Data Barang</title>
    <meta content="width=device-width, initial-scale=1.0, user-scalable=no,
minimum-scale=1.0, maximum-scale=1.0" name="viewport" />
    <meta content="Susilawati" name="author" />
    <link href="../css/bootstrap.css" rel="stylesheet">
    <link href="../font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
</head>

<body>
    <?php
    include "../navbar.php";
    ?>
    <div class="container">
        <h2>Proses Pengolahan Data Barang</h2>
        <p>Sistem Informasi Penjualan - Universitas Medan Area</p>
        <p><a href="#" class="btn btn-success" data-target="#TambahData" data-toggle="modal"><span class="fa fa-plus"></span>Tambah Data</a></p>
        <table id="mytable" class="table table-bordered">
            <thead>
                <th>No</th>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga</th>
                <th>Satuan</th>
                <th>Aksi</th>
            </thead>
            <?php
            //menampilkan data mysqli
            include "../koneksi/koneksi.php";
            $no = 0;
            $result = mysqli_query($conn, "SELECT * FROM barang");
            while ($r = mysqli_fetch_array($result)) {
                $no++;

            ?>
                <tr>
                    <td><?php echo $no; ?></td>
                    <td><?php echo $r['kd_bar']; ?></td>
                    <td><?php echo $r['nama_bar']; ?></td>
                    <td><?php echo $r['satuan']; ?></td>
                    <td><?php echo $r['harga']; ?></td>
                    <td>
                        <a href="#" class='buka_modal' id='<?php echo $r['kd_bar'];
                                                            ?>'>Edit</a> |
                        <a href="#" onclick="konfirmasi_hapus('proses_delete.php?&id=<?php echo $r['kd_bar']; ?>&namatable=barang');">Delete</a>
                    </td>
                </tr>
            <?php } ?>
        </table>
    </div>

    <!-- Modal untuk TambahData-->
    <div id="TambahData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                    <h4 class="modal-title" id="myModalLabel"><span class="fa
fa-plus"></span>Tambah Data</h4>
                </div>
                <div class="modal-body">
                    <form action="proses_savebarang.php" enctype="multipart/form-data" method="POST">
                        <div class="form-group" style="padding-bottom: 20px;">
                            <label for="kode">Kode Barang</label>
                            <input type="text" name="kode" class="form-control" placeholder="Kode Barang" onkeyup="fn_validasi(this.value,'barang','kd_bar','Kode Barang')" required />
                        </div>
                    </form>

                    <div class="form-group" style="padding-bottom: 20px;">
                        <label for="nama">Nama Barang</label>
                        <input type="text" name="nama" class="form-control" placeholder="Nama Barang" required />
                    </div>

                    <div class="form-group" style="padding-bottom: 20px;">
                        <label for="satuan">Satuan</label>
                        <input type="text" name="satuan" class="form-control" placeholder="Satuan" required />
                    </div>

                    <div class="form-group" style="padding-bottom: 20px;">
                        <label for="harga">Harga</label>
                        <input type="text" name="harga" class="form-control" placeholder="Harga" required />
                    </div>
                    <div id="panel_pesan"></div>
                    <div class="modal-footer">
                        <button class="btn btn-success" type="submit">
                            <span class="fa fa-save"></span> Simpan
                        </button>
                        <button type="reset" class="btn btn-danger" data-dismiss="modal" aria-hidden="true">
                            Batal
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Edit-->
    <div id="EditData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    </div>
    <!-- Modal Delete-->
    <div class="modal fade" id="modal_delete">
        <div class="modal-dialog">
            <div class="modal-content" style="margin-top:100px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" style="text-align:center;">Anda yakin
                        akan menghapus data ini ?</h4>
                </div>

                <div class="modal-footer" style="margin:0px; border-top:0px; text-align:center;">
                    <a href="#" class="btn btn-danger" id="delete_link">Hapus</a>
                    <button type="button" class="btn btn-success" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Javascript modal Edit-->
    <script type="text/javascript">
        $(document).ready(function() {
            $(".buka_modal").click(function(e) {
                var m = $(this).attr("id");
                $.ajax({
                    url: "modal_editbarang.php",
                    type: "GET",
                    data: {
                        id: m,
                    },
                    success: function(ajaxData) {
                        $("#EditData").html(ajaxData);
                        $("#EditData").modal('show', {
                            backdrop: 'true'
                        });
                    }
                });
            });
        });
    </script>
    <!-- Javascript untuk Validasi Pesan-->
    <script type="text/javascript">
        function fn_validasi(nilai, table, field, judul) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("panel_pesan").innerHTML = this.responseText;
                }
            };
            var param = "nilai=" + nilai + "&tbl=" + table + "&fld=" + field + "&jdl=" + judul + "";
            //alert(param);
            xhttp.open("GET", "validasi.php?" + param, true);
            xhttp.send();
        }
    </script>
    <!-- Javascript modal Delete-->
    <script type="text/javascript">
        function konfirmasi_hapus(delete_url) {
            $('#modal_delete').modal('show', {
                backdrop: 'static'
            });
            document.getElementById('delete_link').setAttribute('href',
                delete_url);
        }
    </script>
</body>

</html>
