<!DOCTYPE html>
<html>
<?php $this->load->view('admin/head') ?>

<link rel="stylesheet" href="<?php echo base_url('assets/template/back/plugins') ?>/iCheck/square/purple.css">

<body class="hold-transition login-page">

    <div id="view-loading" style="transform: translate(0,0)">
        <section class="content">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="loader"></div>
        </section>
    </div>
    <div id="view-holder" style="display: none">
        <div class="login-box">
            <div class="login-logo">
                <b>Login</b>MTA
            </div>
            <div class="login-box-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form method="post" id="form">
                    <div class="form-group has-feedback">
                        <label for="email">Logon Name</label>
                        <input type="text" class="form-control" placeholder="eg. Mitrais\Someone" id="username" name="username" required>
                        <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <label for="password">Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="Password" id="password" name="password" required>
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-eye-open" id="showPassword"></i>
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-8">
                            <div class="checkbox icheck" style="display: none;">
                                <label class="">
                                    <div class="icheckbox_square-purple" aria-checked="false" aria-disabled="false" style="position: relative;">
                                        <input type="checkbox" id="rememberMe" name="rememberMe" style="
                                   position: absolute;
                                   top: -20%;
                                   left: -20%;
                                   display: block;
                                   width: 140%;
                                   height: 140%;
                                   margin: 0px;
                                   padding: 0px;
                                   background: rgb(255, 255, 255);
                                   border: 0px;
                                   opacity: 0;">
                                        <ins class="iCheck-helper" style="
                                 position: absolute;
                                 top: -20%;
                                 left: -20%;
                                 display: block;
                                 width: 140%;
                                 height: 140%;
                                 margin: 0px;
                                 padding: 0px;
                                 background: rgb(255, 255, 255);
                                 border: 0px;
                                 opacity: 0;">

                                        </ins>
                                    </div> Remember Me
                                </label>
                            </div>
                        </div>
                        <div class="col-xs-4">
                            <button type="submit" class="btn btn-mitrais-primary btn-block btn-flat">Submit</button>
                        </div>
                    </div>
                </form>

                <div class="modal fade" id="modalRole" role="dialog">
                    <div class="modal-dialog" id="modalRoleDialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h2 class="modal-title">Select Roles</h2>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label class="lb-md">Roles</label>
                                    <div class="custom-select" style="width:30%; min-width: 300px">
                                        <select class="form-control" id="roleInModal">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-mitrais-primary" data-dismiss="modal" onclick="setRole()">Continue</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Bootstrap 3.3.7 -->
    <script src="<?php echo base_url('assets/template/back/bower_components') ?>/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- AdminLTE App -->
    <script src="<?php echo base_url('assets/template/back/dist') ?>/js/adminlte.min.js"></script>
    <!-- iCheck -->
    <script src="<?php echo base_url('assets/template/back/plugins/') ?>/iCheck/icheck.min.js"></script>
    <!-- MTA Login -->
    <script src="<?php echo base_url('assets/') ?>/js/other/login.js"></script>
    <!-- Sweet Alert 2 -->
    <script type='text/javascript' src="<?php echo base_url('assets/js') ?>/FormValidation/sweetAlert.js"></script>

    <!-- Default Controller -->
    <script type='text/javascript' src="<?php echo base_url('assets/js') ?>/config.js"></script>
    <script type='text/javascript' src='<?php echo base_url('assets/js') ?>/pageController.js'></script>
    <script type='text/javascript' src="<?php echo base_url('assets/js') ?>/other/roleSelector.js"></script>
    <script>
        $(document).ready(function() {
            mta.server = "<?php echo base_url() ?>";
        });
    </script>

</body>

</html>