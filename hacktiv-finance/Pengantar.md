Judul       :   Hacktiv Finance
Description :   Aplikasi website ini akan menyediakan layanan penghubung antara user (investor) dan company sebagai penyedia layanan investasi.
                Dalam hal ini kami hanya menyediakan satu contoh company yang menyediakan jasa layanan product investasi.
                Adapun layanan investasi yang diberikan oleh company diantaranya adalah Emas, Crypto, Bitcoin.
Alur        :   - Tampilan awal (dashboard)
                    1. User diminta untuk sign up / login melalui sebuah link
                    2. Popup form login/sign up dalam bentuk card
                    3. Setelah berhasil login, user diminta untuk mengisi data profil
                    4. User akan di arahkan ke menu Halaman Utama
                - Halaman Utama
                    1. Navbar berisi, nama user, saldo, home, profil, topup, withdraw, invest, about company, logout
                    2. home menampolkan halamaan utama yang berisi menu topup dan invest
                    3. profil menampilkan data dari user dan terdapat fitur edit profile
                    4. topup menampilkan halaman untuk topup untuk mengisi saldo user
                        - Ketika di klik menu topup, akan menampilkan sebuah form topup yang terdiri dari
                            - nominal topup
                            - payment method
                        - Data topup akan dimasukkan ke database, yang nantinya saldo akan ditampilkan di navbar
                        - Setelah berhasil topup akan ditampilkan notification success topup dan redirect ke halaman utama
                    5. Withdraw
                        - Berisi layanan untuk withdraw dalam bentuk form
                        - jika berhasil akan diberikan notifikasi
                        - validasi saldo minimal withdraw sebanyak 100.000
                    5. invest berisi halaman menu investasi dalam bentuk card, yang terdiri dari chart history harga
                        - di dalam card tersebut terdapat tombol untuk berinvestasi yang akan mengurangi saldo jika berhasil.
                        - disini perlu adanya validasi terkait dengan saldo.
                        - jika berhasil berinvestasi akan diberikan notif success investasi
                    6. about me 
                        - berisi tampilan data company
                    7. logout
                        - logout dari layanan dan akan dilempar dihalaman dashboard