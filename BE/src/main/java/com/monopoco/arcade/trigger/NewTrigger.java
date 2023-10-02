package com.monopoco.arcade.trigger;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;

import java.util.Date;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */
public class NewTrigger implements Trigger {




    @Override
    public Date nextExecutionTime(TriggerContext triggerContext) {
        return null;
    }
}