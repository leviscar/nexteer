package com.example.model;

/**
 * User: cheng
 * Date: 17-6-3
 * Description:
 */
public class PollingPage {
    private String cellName;
    private boolean isPolling;
    private int interval;

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public boolean getIsPolling() {
        return isPolling;
    }

    public void setIsPolling(boolean isPolling) {
        this.isPolling = isPolling;
    }

    public int getInterval() {
        return interval;
    }

    public void setInterval(int interval) {
        this.interval = interval;
    }

    public PollingPage() {
    }
}
