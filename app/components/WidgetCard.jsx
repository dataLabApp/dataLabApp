import React from 'react'

export default (props)=>(
              <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="x_panel tile fixed_height_320">
                <div className="x_title">
                  <h2>App Versions</h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                      <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Settings 1</a>
                        </li>
                        <li><a href="#">Settings 2</a>
                        </li>
                      </ul>
                    </li>
                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content">
                  <h4>App Usage across versions</h4>
                  <div className="widget_summary">
                    <div className="w_left w_25">
                      <span>0.1.5.2</span>
                    </div>
                    <div className="w_center w_55">
                      <div className="progress">
                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '66%'}}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="w_right w_20">
                      <span>123k</span>
                    </div>
                    <div className="clearfix"></div>
                  </div>

                  <div className="widget_summary">
                    <div className="w_left w_25">
                      <span>0.1.5.3</span>
                    </div>
                    <div className="w_center w_55">
                      <div className="progress">
                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "45%"}}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="w_right w_20">
                      <span>53k</span>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="widget_summary">
                    <div className="w_left w_25">
                      <span>0.1.5.4</span>
                    </div>
                    <div className="w_center w_55">
                      <div className="progress">
                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '25%'}}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="w_right w_20">
                      <span>23k</span>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="widget_summary">
                    <div className="w_left w_25">
                      <span>0.1.5.5</span>
                    </div>
                    <div className="w_center w_55">
                      <div className="progress">
                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "5%"}}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="w_right w_20">
                      <span>3k</span>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="widget_summary">
                    <div className="w_left w_25">
                      <span>0.1.5.6</span>
                    </div>
                    <div className="w_center w_55">
                      <div className="progress">
                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '2%'}}>
                          <span className="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="w_right w_20">
                      <span>1k</span>
                    </div>
                    <div className="clearfix"></div>
                  </div>

                </div>
              </div>
            </div>
)
